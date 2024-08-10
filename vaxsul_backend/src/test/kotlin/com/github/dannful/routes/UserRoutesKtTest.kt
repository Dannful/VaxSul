package com.github.dannful.routes

import com.github.dannful.core.Scenario
import com.github.dannful.domain.model.*
import io.ktor.client.call.*
import io.ktor.client.request.*
import io.ktor.client.statement.*
import io.ktor.http.*
import io.ktor.server.config.*
import io.ktor.server.testing.*
import kotlinx.datetime.LocalDateTime
import kotlin.test.Test
import kotlin.test.assertEquals

class UserRoutesKtTest {

    @Test
    fun `When creates user, returns 200 (OK)`() = testApplication {
        environment {
            config = ApplicationConfig("test-application.conf")
        }
        val scenario = Scenario()
        scenario.setupClient(this, Role.RESEARCHER)

        val testResearch = Research(
            startDate = LocalDateTime(
                year = 2024,
                monthNumber = 1,
                dayOfMonth = 1,
                hour = 1,
                minute = 1,
                second = 1
            ),
            status = ResearchStatus.PAUSED,
        )
        val newResearchResponse = scenario.httpClient.post("/researches/new") {
            contentType(ContentType.Application.Json)
            setBody(
                testResearch
            )
        }
        val research = scenario.researchService.getResearch(1)

        assertEquals(HttpStatusCode.OK, newResearchResponse.status)
        assertEquals(testResearch, research)
    }

    @Test
    fun `When updates user, returns 200 (OK)`() = testApplication {
        environment {
            config = ApplicationConfig("test-application.conf")
        }
        val scenario = Scenario()
        val user = scenario.addUser().copy(
            name = "roger roberto edward robinson",
            id = 1
        )
        scenario.setupClient(this)

        val postResponse = scenario.httpClient.post("/users/new") {
            contentType(ContentType.Application.Json)
            setBody(user)
        }
        val response = scenario.httpClient.get("/users")

        assertEquals(HttpStatusCode.OK, postResponse.status)
        assertEquals(user, response.body<List<User>>().firstOrNull())
    }

    @Test
    fun `When gets all users, returns 200 (OK)`() = testApplication {
        environment {
            config = ApplicationConfig("test-application.conf")
        }
        val scenario = Scenario()
        scenario.setupClient(this)
        val user = scenario.addUser()

        val getUsers = scenario.httpClient.get("/users")

        assertEquals(HttpStatusCode.OK, getUsers.status)
        assertEquals(listOf(user), getUsers.body())
    }

    @Test
    fun `When gets user by ID, returns 200 (OK)`() = testApplication {
        environment {
            config = ApplicationConfig("test-application.conf")
        }
        val scenario = Scenario()
        scenario.setupClient(this)
        val user = scenario.addUser()

        scenario.httpClient.post("/login") {
            contentType(ContentType.Application.Json)
            setBody(Credentials(email = user.email, password = user.password))
        }

        val getNewUserResponse = scenario.httpClient.get("/users/1")

        assertEquals(HttpStatusCode.OK, getNewUserResponse.status)
        assertEquals(user, getNewUserResponse.body())
    }

    @Test
    fun `When there is no valid user for given ID, returns 400 (Bad Request)`() = testApplication {
        environment {
            config = ApplicationConfig("test-application.conf")
        }
        val scenario = Scenario()
        scenario.setupClient(this)

        val getUserResponse = scenario.httpClient.get("/users/1")

        assertEquals(HttpStatusCode.BadRequest, getUserResponse.status)
    }

    @Test
    fun `When client is not authorized and deletes user, returns 401 (Unauthorized)`() = testApplication {
        environment {
            config = ApplicationConfig("test-application.conf")
        }
        val scenario = Scenario()
        scenario.setupClient(this, Role.USER)
        scenario.addUser()

        val deleteUserRequest = scenario.httpClient.delete("/users/1")

        assertEquals(HttpStatusCode.Unauthorized, deleteUserRequest.status)
    }

    @Test
    fun `When client is authorized and deletes user, returns 200 (OK)`() = testApplication {
        environment {
            config = ApplicationConfig("test-application.conf")
        }
        val scenario = Scenario()
        scenario.setupClient(this)
        scenario.addUser()
        val deleteUserResponse = scenario.httpClient.delete("/users/1")
        val usersCount = scenario.userService.getUsers().count()

        assertEquals(HttpStatusCode.OK, deleteUserResponse.status)
        assertEquals(0, usersCount)
    }

    @Test
    fun `When client provides non-existent credentials, returns 400 (Bad Request)`() = testApplication {
        environment {
            config = ApplicationConfig("test-application.conf")
        }
        val scenario = Scenario()
        scenario.setupClient(this, Role.USER)

        val loginRequest = scenario.httpClient.post("/login") {
            contentType(ContentType.Application.Json)
            setBody(
                Credentials(
                    email = "a",
                    password = "a"
                )
            )
        }

        assertEquals(HttpStatusCode.BadRequest, loginRequest.status)
    }

    @Test
    fun `When client provides incorrect login credentials, returns 400 (Bad Request)`() = testApplication {
        environment {
            config = ApplicationConfig("test-application.conf")
        }
        val scenario = Scenario()
        scenario.setupClient(this, Role.USER)
        val testUser = scenario.addUser()

        val loginRequest = scenario.httpClient.post("/login") {
            contentType(ContentType.Application.Json)
            setBody(
                Credentials(
                    email = testUser.name,
                    password = testUser.password.reversed()
                )
            )
        }

        assertEquals(HttpStatusCode.BadRequest, loginRequest.status)
    }

    @Test
    fun `When client provides correct login credentials, returns 200 (OK) with JWT`() = testApplication {
        environment {
            config = ApplicationConfig("test-application.conf")
        }
        val scenario = Scenario()
        scenario.setupClient(this, Role.USER)
        val testUser = scenario.addUser()

        val loginRequest = scenario.httpClient.post("/login") {
            contentType(ContentType.Application.Json)
            setBody(
                Credentials(
                    email = testUser.email,
                    password = testUser.password
                )
            )
        }

        assertEquals(HttpStatusCode.OK, loginRequest.status)
        assert(loginRequest.bodyAsText().isNotBlank())
    }

    @Test
    fun `When client provides correct register credentials, returns 200 (OK)`() = testApplication {
        environment {
            config = ApplicationConfig("test-application.conf")
        }
        val scenario = Scenario()
        scenario.setupClient(this)
        val request = scenario.httpClient.post("/register") {
            contentType(ContentType.Application.Json)
            setBody(
                User(
                    email = "test@test.com",
                    name = "test",
                    password = "test",
                    cpf = "12312312",
                    phone = "1233565",
                    birthday = LocalDateTime(2024, 12, 1, 3, 4, 5)
                )
            )
        }

        assertEquals(HttpStatusCode.OK, request.status)
        assertEquals(1, scenario.userService.getUsers().count())
    }

    @Test
    fun `When client provides register credentials with existing username, returns 400 (Bad request)`() =
        testApplication {
            environment {
                config = ApplicationConfig("test-application.conf")
            }
            val scenario = Scenario()
            scenario.setupClient(this)
            val user = scenario.addUser()
            val request = scenario.httpClient.post("/register") {
                contentType(ContentType.Application.Json)
                setBody(
                    Credentials(
                        email = user.email,
                        password = user.password
                    )
                )
            }

            assertEquals(HttpStatusCode.BadRequest, request.status)
        }

    @Test
    fun `When client logs out of session, returns 200 (OK)`() =
        testApplication {
            environment {
                config = ApplicationConfig("test-application.conf")
            }
            val scenario = Scenario()
            scenario.setupClient(this, role = Role.USER)
            val response = scenario.httpClient.post("/logout")

            assertEquals(HttpStatusCode.OK, response.status)
        }

    @Test
    fun `When client logs out without session, returns 400 (Bad Request)`() =
        testApplication {
            environment {
                config = ApplicationConfig("test-application.conf")
            }
            val scenario = Scenario()
            scenario.setupClient(this)
            val response = scenario.httpClient.post("/logout")

            assertEquals(HttpStatusCode.BadRequest, response.status)
        }

    @Test
    fun `When client is authenticated, returns user`() =
        testApplication {
            environment {
                config = ApplicationConfig("test-application.conf")
            }
            val scenario = Scenario()
            val user = scenario.setupClient(this, role = Role.RESEARCHER)
            val response = scenario.httpClient.get("/users/current")

            assertEquals(user, response.body())
        }
}