package com.github.dannful.routes

import com.github.dannful.domain.model.Role
import com.github.dannful.domain.model.Vaccine
import com.github.dannful.domain.model.VaccineQuery
import com.github.dannful.domain.service.VaccineService
import com.github.dannful.plugins.authRole
import io.ktor.http.*
import io.ktor.resources.*
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.resources.*
import io.ktor.server.resources.post
import io.ktor.server.response.*
import io.ktor.server.routing.*
import kotlinx.serialization.Serializable
import org.koin.ktor.ext.inject

fun Application.vaccineRoutes() {
    val vaccineService: VaccineService by inject()

    routing {
        authRole(Role.USER) {
            get<Vaccines> { query ->
                val vaccineQuery = VaccineQuery(
                    name = query.name,
                    minimumPrice = query.minimumPrice,
                    maximumPrice = query.maximumPrice,
                    count = query.count,
                    amountInStock = query.amountInStock,
                    sellable = query.sellable
                )
                if (vaccineQuery.minimumPrice < 0) {
                    call.respond(HttpStatusCode.BadRequest, "Minimum price must be positive")
                    return@get
                }
                if (vaccineQuery.maximumPrice < (vaccineQuery.minimumPrice ?: 0f)) {
                    call.respond(HttpStatusCode.BadRequest, "Maximum price must be greater than minimum price")
                    return@get
                }
                call.respond(HttpStatusCode.OK, vaccineService.search(vaccineQuery))
            }
            get<Vaccines.Vaccine> {
                val vaccine = vaccineService.getVaccineById(it.id) ?: run {
                    call.respond(HttpStatusCode.BadRequest, "Vaccine #${it.id} not found")
                    return@get
                }
                call.respond(HttpStatusCode.OK, vaccine)
            }
        }
        authRole(Role.RESEARCH_LEAD) {
            delete<Vaccines.Vaccine> {
                vaccineService.deleteVaccine(it.id)
                call.respond(HttpStatusCode.OK)
            }
            post<Vaccines.New> {
                val vaccine = call.receiveNullable<Vaccine>() ?: run {
                    call.respond(HttpStatusCode.BadRequest)
                    return@post
                }
                call.respond(HttpStatusCode.OK, vaccineService.addVaccine(vaccine))
            }
        }
    }
}

@Serializable
@Resource("/vaccines")
private class Vaccines(
    val name: String? = null,
    val minimumPrice: Float = 0f,
    val maximumPrice: Float = Float.MAX_VALUE,
    val count: Int = Int.MAX_VALUE,
    val sellable: Boolean? = null,
    val amountInStock: Int = 0
) {

    @Suppress("unused")
    @Resource("{id}")
    class Vaccine(val parent: Vaccines = Vaccines(), val id: Int)

    @Suppress("unused")
    @Resource("/new")
    class New(val parent: Vaccines = Vaccines())
}