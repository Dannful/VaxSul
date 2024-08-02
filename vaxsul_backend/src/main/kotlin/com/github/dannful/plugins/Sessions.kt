package com.github.dannful.plugins

import com.github.dannful.domain.model.UserSession
import com.github.dannful.util.Constants
import io.ktor.server.application.*
import io.ktor.server.sessions.*
import org.koin.ktor.ext.inject

fun Application.configureSessions() {
    val cookieData: SessionTransportTransformerEncrypt by inject()
    install(Sessions) {
        cookie<UserSession>(Constants.AUTH_SESSION_COOKIE) {
            cookie.path = "/"
            transform(cookieData)
            cookie.maxAgeInSeconds = Constants.SESSION_DURATION_SECONDS
        }
    }
}