package com.github.dannful.routes

import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.routing.*

fun Application.healthRoute() {
    routing {
        get("/health") {
            call.respond(HttpStatusCode.OK, "Ok")
        }
    }
}