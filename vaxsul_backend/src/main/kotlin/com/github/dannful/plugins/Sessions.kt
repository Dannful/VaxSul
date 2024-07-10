package com.github.dannful.plugins

import com.github.dannful.domain.model.UserSession
import com.github.dannful.util.Constants
import io.ktor.server.application.*
import io.ktor.server.sessions.*

fun Application.configureSessions() {
    install(Sessions) {
        cookie<UserSession>(Constants.AUTH_SESSION_COOKIE)
    }
}