package com.github.dannful.plugins

import com.github.dannful.routes.*
import io.ktor.server.application.*
import io.ktor.server.resources.*

fun Application.configureRouting() {
    install(Resources)

    userRoutes()
    healthRoute()
}