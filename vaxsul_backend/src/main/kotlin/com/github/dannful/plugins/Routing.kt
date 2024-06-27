package com.github.dannful.plugins

import com.github.dannful.routes.researchRoutes
import com.github.dannful.routes.userRoutes
import com.github.dannful.routes.vaccineRoutes
import io.ktor.server.application.*
import io.ktor.server.resources.*

fun Application.configureRouting() {
    install(Resources)

    userRoutes()
    vaccineRoutes()
    researchRoutes()
}