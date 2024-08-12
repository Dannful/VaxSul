package com.github.dannful.routes

import com.github.dannful.core.Scenario
import com.github.dannful.domain.model.Credentials
import com.github.dannful.domain.model.IdUser
import com.github.dannful.domain.model.Role
import io.ktor.client.call.*
import io.ktor.client.request.*
import io.ktor.http.*
import io.ktor.server.config.*
import io.ktor.server.testing.*
import kotlin.test.Test
import kotlin.test.assertEquals

class UserRouteKtTest {

    @Test
    fun `When GET users, returns OK`() = testApplication {
        environment {
            config = ApplicationConfig("test-application.conf")
        }
        val scenario = Scenario()
        scenario.setupClient(this, role = Role.ADMIN)

        val response = scenario.httpClient.get("/users")

        assertEquals(HttpStatusCode.OK, response.status)
        assertEquals(1, response.body<List<IdUser>>().size)
    }

    @Test
    fun `When DELETE user by ID, returns OK`() = testApplication {
        environment {
            config = ApplicationConfig("test-application.conf")
        }
        val scenario = Scenario()
        scenario.setupClient(this, role = Role.ADMIN)

        val response = scenario.httpClient.delete("/users/1")

        assertEquals(HttpStatusCode.OK, response.status)
        assertEquals(0, scenario.userService.getUsers().size)
    }

    @Test
    fun `When user LOG in, returns OK`() = testApplication {
        environment {
            config = ApplicationConfig("test-application.conf")
        }
        val scenario = Scenario()
        val user = scenario.setupClient(this, role = Role.USER)

        val response = scenario.httpClient.post("/login") {
            contentType(ContentType.Application.Json)
            setBody(Credentials(email = user.email, password = user.password))
        }

        assertEquals(HttpStatusCode.OK, response.status)
    }

    @Test
    fun `When user LOG OUT, returns OK`() = testApplication {
        environment {
            config = ApplicationConfig("test-application.conf")
        }
        val scenario = Scenario()
        scenario.setupClient(this, role = Role.RESEARCHER)

        val response = scenario.httpClient.post("/logout")

        assertEquals(HttpStatusCode.OK, response.status)
    }

    @Test
    fun `When UPDATE user, returns OK`() = testApplication {
        environment {
            config = ApplicationConfig("test-application.conf")
        }
        val scenario = Scenario()
        val user = scenario.setupClient(this, role = Role.RESEARCHER)

        val newUser = IdUser(
            id = 1,
            email = user.email,
            password = user.password,
            laboratoryId = user.laboratoryId,
            role = user.role,
            birthday = user.birthday,
            phone = user.phone,
            cpf = user.cpf,
            name = "DIOGENES ASSADO"
        )
        val response = scenario.httpClient.post("/users/new") {
            contentType(ContentType.Application.Json)
            setBody(
                newUser
            )
        }

        assertEquals(HttpStatusCode.OK, response.status)
        assertEquals(newUser, scenario.userService.getUserById(1))
    }

    @Test
    fun `When GET user auth, returns OK with auth`() = testApplication {
        environment {
            config = ApplicationConfig("test-application.conf")
        }
        val scenario = Scenario()
        val user = scenario.setupClient(this, role = Role.RESEARCHER)

        val response = scenario.httpClient.get("/users/current")

        assertEquals(HttpStatusCode.OK, response.status)
        assertEquals(IdUser(
            id = 1,
            email = user.email,
            password = user.password,
            laboratoryId = user.laboratoryId,
            role = user.role,
            birthday = user.birthday,
            phone = user.phone,
            cpf = user.cpf,
            name = user.name
        ), response.body())
    }
}