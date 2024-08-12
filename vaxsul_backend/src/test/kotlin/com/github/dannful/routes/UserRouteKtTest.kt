package com.github.dannful.routes

import com.github.dannful.core.Scenario
import com.github.dannful.domain.model.Credentials
import com.github.dannful.domain.model.IdUser
import com.github.dannful.domain.model.Role
import io.ktor.client.call.*
import io.ktor.client.request.*
import io.ktor.client.statement.*
import io.ktor.http.*
import io.ktor.server.config.*
import io.ktor.server.testing.*
import kotlinx.serialization.json.*
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
    fun `When UPDATE research by ID, returns OK`() = testApplication {
        environment {
            config = ApplicationConfig("test-application.conf")
        }
        val scenario = Scenario()
        scenario.setupClient(this, role = Role.RESEARCHER)
        scenario.addLaboratory()
        scenario.addResearch()

        val response = scenario.httpClient.post("/graphql") {
            contentType(ContentType.Application.Json)
            setBody(buildJsonObject {
                put(
                    "query",
                    "mutation { updateResearch(id: 1, research: { laboratoryId: 1, startDate: \"2024-01-01T13:00:00\", status: COMPLETED, progress: 3, name: \"hello\", description: \"eae\", report: \"romano\" }) { report } }"
                )
            })
        }

        assertEquals(HttpStatusCode.OK, response.status)
        assertEquals(buildJsonObject {
            put("data", buildJsonObject {
                put("updateResearch",
                    buildJsonObject {
                        put("report", "romano")
                    })
            })
        }, response.body())
    }
}