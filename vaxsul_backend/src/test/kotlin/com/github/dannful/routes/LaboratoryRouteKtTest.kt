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

class LaboratoryRouteKtTest {

    @Test
    fun `When GET laboratories, returns OK`() = testApplication {
        environment {
            config = ApplicationConfig("test-application.conf")
        }
        val scenario = Scenario()
        scenario.setupClient(this, role = Role.USER)
        scenario.addLaboratory()

        val response = scenario.httpClient.post("/graphql") {
            contentType(ContentType.Application.Json)
            setBody(buildJsonObject {
                put("query", "{ laboratories { name } }")
            })
        }

        assertEquals(HttpStatusCode.OK, response.status)
        assertEquals(buildJsonObject {
            put("data", buildJsonObject {
                put("laboratories", buildJsonArray {
                    add(
                        buildJsonObject {
                            put("name", "romano")
                        })
                })
            })
        }, response.body())
    }

    @Test
    fun `When GET laboratory by ID, returns OK`() = testApplication {
        environment {
            config = ApplicationConfig("test-application.conf")
        }
        val scenario = Scenario()
        scenario.setupClient(this, role = Role.USER)
        scenario.addLaboratory()

        val response = scenario.httpClient.post("/graphql") {
            contentType(ContentType.Application.Json)
            setBody(buildJsonObject {
                put(
                    "query",
                    "{ laboratory(id: 1) { description } }"
                )
            })
        }

        assertEquals(HttpStatusCode.OK, response.status)
        assertEquals(buildJsonObject {
            put("data", buildJsonObject {
                put("laboratory",
                    buildJsonObject {
                        put("description", "romano")
                    })
            })
        }, response.body())
    }

    @Test
    fun `When UPDATE laboratory by ID, returns OK`() = testApplication {
        environment {
            config = ApplicationConfig("test-application.conf")
        }
        val scenario = Scenario()
        scenario.setupClient(this, role = Role.ADMIN)
        scenario.addLaboratory()

        val response = scenario.httpClient.post("/graphql") {
            contentType(ContentType.Application.Json)
            setBody(buildJsonObject {
                put(
                    "query",
                    "mutation { updateLaboratory(id: 1, laboratory: { cnpj: \"123\", description: \"eae\", name: \"romanovsky\" }) { name } }"
                )
            })
        }

        assertEquals(HttpStatusCode.OK, response.status)
        assertEquals(buildJsonObject {
            put("data", buildJsonObject {
                put("updateLaboratory",
                    buildJsonObject {
                        put("name", "romanovsky")
                    })
            })
        }, response.body())
    }

    @Test
    fun `When UPDATE laboratory by ID, returns UNAUTHORIZED`() = testApplication {
        environment {
            config = ApplicationConfig("test-application.conf")
        }
        val scenario = Scenario()
        scenario.setupClient(this, role = Role.USER)
        scenario.addLaboratory()

        val response = scenario.httpClient.post("/graphql") {
            contentType(ContentType.Application.Json)
            setBody(buildJsonObject {
                put(
                    "query",
                    "mutation { updateLaboratory(id: 1, laboratory: { cnpj: \"123\", description: \"eae\", name: \"romanovsky\" }) { name } }"
                )
            })
        }

        val responseAsJson = Json.parseToJsonElement(response.bodyAsText())

        assertEquals(HttpStatusCode.OK, response.status)
        assertEquals(
            "Unauthorized: this requires the role of ADMIN",
            responseAsJson.jsonObject["errors"]?.jsonArray?.get(0)?.jsonObject?.get("message")?.jsonPrimitive?.content
        )
    }
}