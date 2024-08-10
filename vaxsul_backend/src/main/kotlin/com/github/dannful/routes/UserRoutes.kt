package com.github.dannful.routes

import com.auth0.jwt.JWT
import com.auth0.jwt.algorithms.Algorithm
import com.github.dannful.domain.model.Credentials
import com.github.dannful.domain.model.JWTData
import com.github.dannful.domain.model.User
import com.github.dannful.domain.model.UserSession
import com.github.dannful.domain.service.UserService
import com.github.dannful.util.Constants
import io.ktor.http.*
import io.ktor.resources.*
import io.ktor.server.application.*
import io.ktor.server.auth.*
import io.ktor.server.request.*
import io.ktor.server.resources.*
import io.ktor.server.resources.post
import io.ktor.server.response.*
import io.ktor.server.routing.*
import io.ktor.server.sessions.*
import org.koin.ktor.ext.inject
import java.util.*

fun Application.userRoutes() {
    val userService: UserService by inject()
    val jwtData: JWTData by inject()
    routing {
        authenticate(Constants.ADMIN_AUTH_NAME) {
            get<Users> {
                call.respond(HttpStatusCode.OK, userService.getUsers())
            }
            delete<Users.User> {
                userService.deleteUser(it.id)
                call.respond(HttpStatusCode.OK)
            }
        }
        post<Users.New> {
            val user = call.receiveNullable<User>() ?: run {
                call.respond(HttpStatusCode.BadRequest)
                return@post
            }
            val session = call.sessions.get<UserSession>() ?: run {
                call.respond(HttpStatusCode.Unauthorized)
                return@post
            }
            val foundUser = userService.getUserByEmail(session.email)
            if(user.id != foundUser?.id) {
                call.respond(HttpStatusCode.Unauthorized)
                return@post
            }
            userService.addUser(user)
            call.respond(HttpStatusCode.OK)
        }
        get<Users.User> {
            val user = userService.getUserById(it.id) ?: run {
                call.respond(HttpStatusCode.BadRequest, "User #${it.id} not found")
                return@get
            }
            val session = call.sessions.get<UserSession>() ?: run {
                call.respond(HttpStatusCode.Unauthorized)
                return@get
            }
            if (session.email != user.email) {
                call.respond(HttpStatusCode.Unauthorized)
                return@get
            }
            call.respond(HttpStatusCode.OK, user)
        }
        post<Register> {
            val user = call.receiveNullable<User>() ?: run {
                call.respond(HttpStatusCode.BadRequest, "Invalid user schema")
                return@post
            }
            if (userService.getUserByEmail(user.name) != null) {
                call.respond(HttpStatusCode.BadRequest, "User already exists")
                return@post
            }
            userService.addUser(
                user
            )
            call.respond(HttpStatusCode.OK)
        }
        post<Logout> {
            call.sessions.get<UserSession>() ?: run {
                call.respond(HttpStatusCode.BadRequest, "User is not logged in")
                return@post
            }
            call.sessions.clear<UserSession>()
            call.respond(HttpStatusCode.OK)
        }
        post<Login> {
            val credentials = call.receiveNullable<Credentials>() ?: run {
                call.respond(HttpStatusCode.BadRequest, "Username and password are required")
                return@post
            }
            val user = userService.getUserByEmail(credentials.email) ?: run {
                call.respond(HttpStatusCode.BadRequest, "User not found")
                return@post
            }
            if (credentials.password != user.password) {
                call.respond(HttpStatusCode.BadRequest, "Invalid credentials")
                return@post
            }
            val token = JWT.create()
                .withAudience(
                    jwtData.audience
                )
                .withIssuer(
                    jwtData.issuer
                )
                .withClaim(Constants.JWT_CLAIM_EMAIL_FIELD_NAME, credentials.email)
                .withClaim(Constants.JWT_CLAIM_PASSWORD_FIELD_NAME, credentials.password)
                .withClaim(Constants.JWT_CLAIM_ROLE_FIELD_NAME, user.role.name)
                .withExpiresAt(Date(System.currentTimeMillis() + Constants.SESSION_DURATION_SECONDS * 1000))
                .sign(
                    Algorithm.HMAC256(
                        jwtData.secret
                    )
                )
            call.sessions.set(
                UserSession(
                    email = credentials.email,
                    token = token
                )
            )
            call.respond(HttpStatusCode.OK, token)
        }
        get<Users.Current> {
            val session = call.sessions.get<UserSession>() ?: run {
                call.respond(HttpStatusCode.BadRequest, "User is not authenticated")
                return@get
            }
            val user = userService.getUserByEmail(session.email) ?: run {
                call.respond(HttpStatusCode.BadRequest, "User is invalid")
                return@get
            }
            call.respond(HttpStatusCode.OK, user)
        }
    }
}

@Resource("/register")
private class Register

@Resource("/users")
private class Users {

    @Resource("{id}")
    @Suppress("unused")
    class User(val parent: Users = Users(), val id: Int)

    @Resource("/new")
    @Suppress("unused")
    class New(val parent: Users = Users())

    @Resource("/current")
    @Suppress("unused")
    class Current(val parent: Users = Users())
}

@Resource("/login")
private class Login

@Resource("/logout")
private class Logout