package com.github.dannful.routes

import com.github.dannful.core.Scenario
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

class ResearchRouteKtTest {

    @Test
    fun `When GET researches, returns OK`() = testApplication {
        environment {
            config = ApplicationConfig("test-application.conf")
        }
        val scenario = Scenario()
        scenario.setupClient(this, role = Role.RESEARCHER)
        scenario.addLaboratory()
        scenario.addResearch()
        scenario.addVaccine()
        scenario.addPurchase()

        val response = scenario.httpClient.post("/graphql") {
            contentType(ContentType.Application.Json)
            setBody(buildJsonObject {
                put("query", "{ researches { id } }")
            })
        }

        assertEquals(HttpStatusCode.OK, response.status)
        assertEquals(buildJsonObject {
            put("data", buildJsonObject {
                put("researches", buildJsonArray {
                    add(
                        buildJsonObject {
                            put("id", 1)
                        })
                })
            })
        }, response.body())
    }

    @Test
    fun `When GET research by ID, returns OK`() = testApplication {
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
                    "{ research(id: 1) { id } }"
                )
            })
        }

        assertEquals(HttpStatusCode.OK, response.status)
        assertEquals(buildJsonObject {
            put("data", buildJsonObject {
                put("research",
                    buildJsonObject {
                        put("id", 1)
                    })
            })
        }, response.body())
    }

    @Test
    fun `When GET research by ID, returns UNAUTHORIZED`() = testApplication {
        environment {
            config = ApplicationConfig("test-application.conf")
        }
        val scenario = Scenario()
        scenario.setupClient(this, role = Role.USER)
        scenario.addLaboratory()
        scenario.addResearch()

        val response = scenario.httpClient.post("/graphql") {
            contentType(ContentType.Application.Json)
            setBody(buildJsonObject {
                put(
                    "query",
                    "{ research(id: 1) { id } }"
                )
            })
        }

        val responseAsJson = Json.parseToJsonElement(response.bodyAsText())

        assertEquals(HttpStatusCode.OK, response.status)
        assertEquals(
            "Unauthorized: this requires the role of RESEARCHER",
            responseAsJson.jsonObject["errors"]?.jsonArray?.get(0)?.jsonObject?.get("message")?.jsonPrimitive?.content
        )
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