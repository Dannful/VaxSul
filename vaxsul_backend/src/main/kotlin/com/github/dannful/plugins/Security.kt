package com.github.dannful.plugins

import com.auth0.jwt.JWT
import com.auth0.jwt.algorithms.Algorithm
import com.github.dannful.domain.model.JWTData
import com.github.dannful.domain.model.Role
import com.github.dannful.domain.model.UserSession
import com.github.dannful.domain.service.UserService
import com.github.dannful.util.Constants
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.auth.*
import io.ktor.server.auth.jwt.*
import io.ktor.server.response.*
import org.koin.ktor.ext.inject

fun Application.configureSecurity() {
    val userService: UserService by inject()
    val jwtData: JWTData by inject()

    val adminUser = environment.config.propertyOrNull("auth.admin.user")?.getString() ?: throw IllegalArgumentException(
        "Admin user missing in application config"
    )
    val adminPassword = environment.config.propertyOrNull("auth.admin.password")?.getString()
        ?: throw IllegalArgumentException("Admin user missing in application config")

    authentication {
        basic(name = Constants.ADMIN_AUTH_NAME) {
            validate { credentials ->
                if (credentials.name == adminUser && credentials.password == adminPassword)
                    UserIdPrincipal(credentials.name)
                else null
            }
        }
        jwt(Constants.JWT_STANDARD) {
            configureJWT(userService = userService, jwtData = jwtData, role = Role.USER)
        }
        jwt(Constants.JWT_MANAGER) {
            configureJWT(userService = userService, jwtData = jwtData, role = Role.SALES_MANAGER)
        }
        jwt(Constants.JWT_RESEARCHER) {
            configureJWT(userService = userService, jwtData = jwtData, role = Role.RESEARCHER)
        }
        jwt(Constants.JWT_RESEARCH_LEAD) {
            configureJWT(userService = userService, jwtData = jwtData, role = Role.RESEARCH_LEAD)
        }
        session<UserSession>(Constants.SESSION_STANDARD) {
            configureJWT(userService = userService, jwtData = jwtData, role = Role.USER)
        }
        session<UserSession>(Constants.SESSION_MANAGER) {
            configureJWT(userService = userService, jwtData = jwtData, role = Role.SALES_MANAGER)
        }
        session<UserSession>(Constants.SESSION_RESEARCHER) {
            configureJWT(userService = userService, jwtData = jwtData, role = Role.RESEARCHER)
        }
        session<UserSession>(Constants.SESSION_RESEARCH_LEAD) {
            configureJWT(userService = userService, jwtData = jwtData, role = Role.RESEARCH_LEAD)
        }
    }
}

private fun SessionAuthenticationProvider.Config<UserSession>.configureJWT(
    userService: UserService,
    jwtData: JWTData,
    role: Role
) {
    validate { session ->
        try {
            val token = JWT.require(Algorithm.HMAC256(jwtData.secret)).withAudience(jwtData.audience)
                .withIssuer(jwtData.issuer)
                .build().verify(session.token)
            val username = token.getClaim(Constants.JWT_CLAIM_EMAIL_FIELD_NAME).asString()
            val password = token.getClaim(Constants.JWT_CLAIM_PASSWORD_FIELD_NAME).asString()
            val assignedRole =
                Role.valueOf(token.getClaim(Constants.JWT_CLAIM_ROLE_FIELD_NAME).asString())
            val user = userService.getUserByEmail(username) ?: return@validate null
            if (password == user.password && assignedRole == role && user.role == assignedRole) {
                UserIdPrincipal(username)
            } else {
                null
            }
        } catch (e: Exception) {
            null
        }
    }
}

private fun JWTAuthenticationProvider.Config.configureJWT(userService: UserService, jwtData: JWTData, role: Role) {
    realm = jwtData.realm
    verifier(
        JWT
            .require(Algorithm.HMAC256(jwtData.secret))
            .withAudience(jwtData.audience)
            .withIssuer(jwtData.issuer)
            .build()
    )
    validate { jwtCredential ->
        val username = jwtCredential.payload.getClaim(Constants.JWT_CLAIM_EMAIL_FIELD_NAME).asString()
        val password = jwtCredential.payload.getClaim(Constants.JWT_CLAIM_PASSWORD_FIELD_NAME).asString()
        val assignedRole = Role.valueOf(jwtCredential.payload.getClaim(Constants.JWT_CLAIM_ROLE_FIELD_NAME).asString())
        val user = userService.getUserByEmail(username) ?: return@validate null
        if (password == user.password && assignedRole == role && user.role == assignedRole) {
            UserIdPrincipal(username)
        } else {
            null
        }
    }
    challenge { _, _ ->
        call.respond(HttpStatusCode.Unauthorized, "Token is not valid or has expired")
    }
}
