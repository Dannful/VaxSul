package com.github.dannful.routes

import com.github.dannful.domain.model.Vaccine
import com.github.dannful.domain.service.VaccineService
import com.github.dannful.util.Constants
import io.ktor.http.*
import io.ktor.resources.*
import io.ktor.server.application.*
import io.ktor.server.auth.*
import io.ktor.server.request.*
import io.ktor.server.resources.post
import io.ktor.server.resources.get
import io.ktor.server.resources.delete
import io.ktor.server.response.*
import io.ktor.server.routing.*
import kotlinx.serialization.Serializable
import org.koin.ktor.ext.inject

fun Application.vaccineRoutes() {
    val vaccineService: VaccineService by inject()

    routing {
        authenticate(Constants.JWT_MANAGER) {
            get<Vaccines> {
                this.call.respond(HttpStatusCode.OK, vaccineService.getVaccines())
            }
            get<Vaccines.Vaccine> {
                val vaccine = vaccineService.getVaccineById(it.id) ?: run {
                    call.respond(HttpStatusCode.BadRequest, "Vaccine #${it.id} not found")
                    return@get
                }
                call.respond(HttpStatusCode.OK, vaccine)
            }
            delete<Vaccines.Vaccine> {
                vaccineService.deleteVaccine(it.id)
                call.respond(HttpStatusCode.OK)
            }
            post<Vaccines.New> {
                val vaccine = call.receiveNullable<Vaccine>() ?: run {
                    call.respond(HttpStatusCode.BadRequest)
                    return@post
                }
                vaccineService.addVaccine(vaccine)
                call.respond(HttpStatusCode.OK)
            }
        }
    }
}

@Serializable
@Resource("/vaccines")
private class Vaccines {

    @Suppress("unused")
    @Resource("{id}")
    class Vaccine(val parent: Vaccines = Vaccines(), val id: Int)

    @Suppress("unused")
    @Resource("/new")
    class New(val parent: Vaccines = Vaccines())
}