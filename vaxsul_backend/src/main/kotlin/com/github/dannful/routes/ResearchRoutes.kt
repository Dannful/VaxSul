package com.github.dannful.routes

import com.github.dannful.domain.model.Research
import com.github.dannful.domain.service.ResearchService
import com.github.dannful.util.Constants
import io.ktor.http.*
import io.ktor.resources.*
import io.ktor.server.application.*
import io.ktor.server.auth.*
import io.ktor.server.request.*
import io.ktor.server.resources.post;
import io.ktor.server.resources.get;
import io.ktor.server.resources.delete;
import io.ktor.server.response.*
import io.ktor.server.routing.*
import kotlinx.serialization.Serializable
import org.koin.ktor.ext.inject

fun Application.researchRoutes() {
    val researchService: ResearchService by inject()

    routing {
        authenticate(Constants.JWT_RESEARCH_LEAD) {
            delete<Researches.Research> {
                researchService.deleteResearch(it.id)
                call.respond(HttpStatusCode.OK)
            }
        }
        authenticate(Constants.JWT_RESEARCH_LEAD, Constants.JWT_RESEARCHER) {
            post<Researches.New> {
                val vaccine = call.receiveNullable<Research>() ?: run {
                    call.respond(HttpStatusCode.BadRequest)
                    return@post
                }
                researchService.addResearch(vaccine)
                call.respond(HttpStatusCode.OK)
            }
            get<Researches> {
                this.call.respond(HttpStatusCode.OK, researchService.getResearches())
            }
            get<Researches.Research> {
                val vaccine = researchService.getResearch(it.id) ?: run {
                    call.respond(HttpStatusCode.BadRequest, "Research #${it.id} not found")
                    return@get
                }
                call.respond(HttpStatusCode.OK, vaccine)
            }
        }
    }
}

@Serializable
@Resource("/researches")
class Researches {

    @Resource("{id}")
    class Research(val parent: Researches = Researches(), val id: Int)

    @Resource("/new")
    class New(val parent: Researches = Researches())
}