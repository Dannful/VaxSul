package com.github.dannful.routes

import com.github.dannful.domain.service.PurchaseService
import io.ktor.http.*
import io.ktor.resources.*
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.resources.post
import io.ktor.server.resources.get
import io.ktor.server.response.*
import io.ktor.server.routing.*
import org.koin.ktor.ext.inject

fun Application.purchaseRoutes() {
    val purchaseService: PurchaseService by inject()
    routing {
        get<Purchase.Id> {
            val purchase = purchaseService.getById(it.id) ?: run {
                call.respond(HttpStatusCode.BadRequest, "Invalid purchase")
                return@get
            }
            call.respond(HttpStatusCode.OK, purchase)
        }
        get<Purchase.User.Id> {
            val purchases = purchaseService.getForUser(it.id)
            call.respond(HttpStatusCode.OK, purchases)
        }
        post<Purchase.New> {
            val purchase = call.receiveNullable<com.github.dannful.domain.model.Purchase>() ?: run {
                call.respond(HttpStatusCode.BadRequest, "Invalid purchase body")
                return@post
            }
            purchaseService.add(purchase)
            call.respond(HttpStatusCode.OK)
        }
    }
}

@Resource("/purchase")
@Suppress("unused")
private class Purchase {

    @Resource("/{id}")
    class Id(val parent: Purchase = Purchase(), val id: Int)

    @Resource("/user")
    class User(val parent: Purchase = Purchase()) {

        @Resource("{id}")
        class Id(val parent: User = User(), val id: Int)
    }

    @Resource("/new")
    class New(val parent: Purchase = Purchase())
}