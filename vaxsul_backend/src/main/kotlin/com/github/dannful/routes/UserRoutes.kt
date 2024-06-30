package com.github.dannful.routes

import com.auth0.jwt.JWT
import com.auth0.jwt.algorithms.Algorithm
import com.github.dannful.domain.model.*
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
import kotlinx.serialization.Serializable
import org.koin.ktor.ext.inject
import java.util.*
import java.util.concurrent.TimeUnit

fun Application.userRoutes() {
    val userService: UserService by inject()
    val jwtData: JWTData by inject()
    routing {
        authenticate(Constants.ADMIN_AUTH_NAME) {
            get<Users> {
                call.respond(HttpStatusCode.OK, userService.getUsers())
            }
            get<Users.User> {
                val user = userService.getUserById(it.id) ?: run {
                    call.respond(HttpStatusCode.BadRequest, "User #${it.id} not found")
                    return@get
                }
                call.respond(HttpStatusCode.OK, user)
            }
            delete<Users.User> {
                userService.deleteUser(it.id)
                call.respond(HttpStatusCode.OK)
            }
            post<Users.New> {
                val user = call.receiveNullable<User>() ?: run {
                    call.respond(HttpStatusCode.BadRequest)
                    return@post
                }
                userService.addUser(user)
                call.respond(HttpStatusCode.OK)
            }
        }
        post<Register> {
            val credentials = call.receiveNullable<Credentials>() ?: run {
                call.respond(HttpStatusCode.BadRequest, "Username and password are required")
                return@post
            }
            if (userService.getUserByEmail(credentials.username) != null) {
                call.respond(HttpStatusCode.BadRequest, "User already exists")
                return@post
            }
            userService.addUser(
                User(
                    email = credentials.username,
                    password = credentials.password,
                    username = credentials.username,
                    role = Role.USER
                )
            )
            call.respond(HttpStatusCode.OK)
        }
        post<Login> {
            val credentials = call.receiveNullable<Credentials>() ?: run {
                call.respond(HttpStatusCode.BadRequest, "Username and password are required")
                return@post
            }
            val user = userService.getUserByEmail(credentials.username) ?: run {
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
                .withClaim(Constants.JWT_CLAIM_USERNAME_FIELD_NAME, credentials.username)
                .withClaim(Constants.JWT_CLAIM_PASSWORD_FIELD_NAME, credentials.password)
                .withClaim(Constants.JWT_CLAIM_ROLE_FIELD_NAME, user.role.name)
                .withExpiresAt(Date(System.currentTimeMillis() + TimeUnit.MINUTES.toMillis(5)))
                .sign(
                    Algorithm.HMAC256(
                        jwtData.secret
                    )
                )
            call.sessions.set(
                UserSession(
                    email = credentials.username
                )
            )
            call.respond(HttpStatusCode.OK, token)
        }
    }
}

@Resource("/register")
private class Register

@Resource("/users")
private class Users {

    @Resource("{id}")
    class User(val parent: Users = Users(), val id: Int)

    @Resource("/new")
    class New(val parent: Users = Users())
}

@Resource("/login")
private class Login