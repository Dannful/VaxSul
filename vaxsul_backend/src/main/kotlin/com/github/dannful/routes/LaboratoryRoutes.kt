package com.github.dannful.routes

import com.github.dannful.domain.model.Laboratory
import com.github.dannful.domain.service.LaboratoryService
import com.github.dannful.util.Constants
import io.ktor.http.*
import io.ktor.resources.*
import io.ktor.server.application.*
import io.ktor.server.auth.*
import io.ktor.server.request.*
import io.ktor.server.resources.post
import io.ktor.server.resources.get
import io.ktor.server.response.*
import io.ktor.server.routing.*
import org.koin.ktor.ext.inject

fun Application.laboratoryRoutes() {
    val laboratoryService: LaboratoryService by inject()
    routing {
        get<LaboratoryRoutes> {
            call.respond(HttpStatusCode.OK, laboratoryService.getLaboratories())
        }
        authenticate(Constants.ADMIN_AUTH_NAME) {
            post<LaboratoryRoutes.New> {
                val laboratory = call.receiveNullable<Laboratory>() ?: run {
                    call.respond(HttpStatusCode.BadRequest, "Invalid laboratory model")
                    return@post
                }
                laboratoryService.addLaboratory(laboratory)
                call.respond(HttpStatusCode.OK)
            }
        }
        get<LaboratoryRoutes.Id> {
            val laboratory = laboratoryService.getLaboratory(it.id) ?: run {
                call.respond(HttpStatusCode.BadRequest, "Invalid laboratory")
                return@get
            }
            call.respond(HttpStatusCode.OK, laboratory)
        }
    }
}

@Resource("/laboratory")
@Suppress("unused")
private class LaboratoryRoutes {

    @Resource("/{id}")
    class Id(val parent: LaboratoryRoutes = LaboratoryRoutes(), val id: Int)

    @Resource("/new")
    class New(val parent: LaboratoryRoutes = LaboratoryRoutes())
}