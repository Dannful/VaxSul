package com.github.dannful.routes

import com.github.dannful.core.Scenario
import com.github.dannful.domain.model.ResearchStatus
import com.github.dannful.domain.model.Role
import com.github.dannful.domain.model.User
import io.ktor.client.call.*
import io.ktor.client.request.*
import io.ktor.http.*
import io.ktor.server.config.*
import io.ktor.server.testing.*
import kotlin.test.Test
import kotlin.test.assertEquals

class ResearchRoutesKtTest {

    @Test
    fun `When creates research, returns 200 (OK)`() = testApplication {
        environment {
            config = ApplicationConfig("test-application.conf")
        }
        val scenario = Scenario()
        val testUser = User(
            name = "test",
            password = "test",
            email = "test@test.com",
            role = Role.USER,
            state = "RS",
            city = "Haddonfield"
        )
        scenario.setupClient(this)
        val newUserResponse = scenario.httpClient.post("/users/new") {
            contentType(ContentType.Application.Json)
            setBody(
                testUser
            )
        }

        val user = scenario.userService.getUserById(1)

        assertEquals(HttpStatusCode.OK, newUserResponse.status)
        assertEquals(testUser, user)
    }

    @Test
    fun `When updates research, returns 200 (OK)`() = testApplication {
        environment {
            config = ApplicationConfig("test-application.conf")
        }
        val scenario = Scenario()
        scenario.setupClient(this, role = Role.RESEARCH_LEAD)
        val research = scenario.addResearch().copy(
            status = ResearchStatus.COMPLETED,
            id = 1
        )

        val researchUpdateResponse = scenario.httpClient.post("/researches/new") {
            contentType(ContentType.Application.Json)
            setBody(
                research
            )
        }

        val foundResearch = scenario.researchService.getResearch(1)

        assertEquals(HttpStatusCode.OK, researchUpdateResponse.status)
        assertEquals(research, foundResearch)
    }

    @Test
    fun `When gets all researches, returns 200 (OK)`() = testApplication {
        environment {
            config = ApplicationConfig("test-application.conf")
        }
        val scenario = Scenario()
        scenario.setupClient(this, Role.RESEARCHER)
        val research = scenario.addResearch()

        val getResearches = scenario.httpClient.get("/researches")

        assertEquals(HttpStatusCode.OK, getResearches.status)
        assertEquals(listOf(research), getResearches.body())
    }

    @Test
    fun `When gets research by ID, returns 200 (OK)`() = testApplication {
        environment {
            config = ApplicationConfig("test-application.conf")
        }
        val scenario = Scenario()
        scenario.setupClient(this, Role.RESEARCH_LEAD)
        val research = scenario.addResearch()

        val getNewResearchResponse = scenario.httpClient.get("/researches/1")

        assertEquals(HttpStatusCode.OK, getNewResearchResponse.status)
        assertEquals(research, getNewResearchResponse.body())
    }

    @Test
    fun `When there is no valid research for given ID, returns 400 (Bad Request)`() = testApplication {
        environment {
            config = ApplicationConfig("test-application.conf")
        }
        val scenario = Scenario()
        scenario.setupClient(this, Role.RESEARCHER)

        val getNewResearchResponse = scenario.httpClient.get("/researches/1")

        assertEquals(HttpStatusCode.BadRequest, getNewResearchResponse.status)
    }

    @Test
    fun `When user is not authorized and deletes research, returns 401 (Unauthorized)`() = testApplication {
        environment {
            config = ApplicationConfig("test-application.conf")
        }
        val scenario = Scenario()
        scenario.setupClient(this, Role.RESEARCHER)
        scenario.addResearch()

        val deleteResearchRequest = scenario.httpClient.delete("/researches/1")

        assertEquals(HttpStatusCode.Unauthorized, deleteResearchRequest.status)
    }

    @Test
    fun `When user is authorized and deletes research, returns 200 (OK)`() = testApplication {
        environment {
            config = ApplicationConfig("test-application.conf")
        }
        val scenario = Scenario()
        scenario.setupClient(this, Role.RESEARCH_LEAD)
        scenario.addResearch()

        val deleteResearchRequest = scenario.httpClient.delete("/researches/1")

        val researchesCount = scenario.researchService.getResearches().count()
        assertEquals(HttpStatusCode.OK, deleteResearchRequest.status)
        assertEquals(0, researchesCount)
    }
}