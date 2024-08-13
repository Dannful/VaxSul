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

class VaccineRouteKtTest {

    @Test
    fun `When GET vaccines, returns OK`() = testApplication {
        environment {
            config = ApplicationConfig("test-application.conf")
        }
        val scenario = Scenario()
        scenario.setupClient(this, role = Role.USER)
        scenario.addLaboratory()
        scenario.addResearch()
        scenario.addVaccine()

        val response = scenario.httpClient.post("/graphql") {
            contentType(ContentType.Application.Json)
            setBody(buildJsonObject {
                put("query", "{ vaccines { id } }")
            })
        }

        assertEquals(HttpStatusCode.OK, response.status)
        assertEquals(buildJsonObject {
            put("data", buildJsonObject {
                put("vaccines", buildJsonArray {
                    add(
                        buildJsonObject {
                            put("id", 1)
                        })
                })
            })
        }, response.body())
    }

    @Test
    fun `When UPDATE vaccines, returns OK`() = testApplication {
        environment {
            config = ApplicationConfig("test-application.conf")
        }
        val scenario = Scenario()
        scenario.setupClient(this, role = Role.SALES_MANAGER)
        scenario.addLaboratory()
        scenario.addResearch()
        scenario.addVaccine()

        val response = scenario.httpClient.post("/graphql") {
            contentType(ContentType.Application.Json)
            setBody(buildJsonObject {
                put(
                    "query",
                    "mutation { updateVaccine(id: 1, vaccine: { dose: 3, name: \"hello\", description: \"hello\", pricePerUnit: 2, amountInStock: 3, researchId: 1 }) { name } }"
                )
            })
        }

        assertEquals(HttpStatusCode.OK, response.status)
        assertEquals(buildJsonObject {
            put("data", buildJsonObject {
                put("updateVaccine",
                    buildJsonObject {
                        put("name", "hello")
                    })
            })
        }, response.body())
    }

    @Test
    fun `When CONSUME vaccine stock, returns OK`() = testApplication {
        environment {
            config = ApplicationConfig("test-application.conf")
        }
        val scenario = Scenario()
        scenario.setupClient(this, role = Role.USER)
        scenario.addLaboratory()
        scenario.addResearch()
        scenario.addVaccine()

        val response = scenario.httpClient.post("/graphql") {
            contentType(ContentType.Application.Json)
            setBody(buildJsonObject {
                put(
                    "query",
                    "mutation { updateVaccineStock(id: 1, decrement: 1) { amountInStock } }"
                )
            })
        }

        assertEquals(HttpStatusCode.OK, response.status)
        assertEquals(buildJsonObject {
            put("data", buildJsonObject {
                put("updateVaccineStock",
                    buildJsonObject {
                        put("amountInStock", 2)
                    })
            })
        }, response.body())
    }

    @Test
    fun `When CREATE vaccine, returns OK`() = testApplication {
        environment {
            config = ApplicationConfig("test-application.conf")
        }
        val scenario = Scenario()
        scenario.setupClient(this, role = Role.SALES_MANAGER)
        scenario.addLaboratory()
        scenario.addResearch()

        val response = scenario.httpClient.post("/graphql") {
            contentType(ContentType.Application.Json)
            setBody(buildJsonObject {
                put(
                    "query",
                    "mutation { newVaccine(vaccine: { dose: 3, name: \"hello\", description: \"hello\", pricePerUnit: 2, amountInStock: 3, researchId: 1 }) { name } }"
                )
            })
        }

        assertEquals(HttpStatusCode.OK, response.status)
        assertEquals(buildJsonObject {
            put("data", buildJsonObject {
                put("newVaccine",
                    buildJsonObject {
                        put("name", "hello")
                    })
            })
        }, response.body())
    }

    @Test
    fun `When SEARCH vaccines, returns OK`() = testApplication {
        environment {
            config = ApplicationConfig("test-application.conf")
        }
        val scenario = Scenario()
        scenario.setupClient(this, role = Role.USER)
        scenario.addLaboratory()
        scenario.addResearch()
        scenario.addVaccine()

        val response = scenario.httpClient.post("/graphql") {
            contentType(ContentType.Application.Json)
            setBody(buildJsonObject {
                put(
                    "query",
                    "{ searchVaccine(vaccineQuery: { name: \"romano\" }) { count, vaccines { description } } }"
                )
            })
        }

        assertEquals(HttpStatusCode.OK, response.status)
        assertEquals(buildJsonObject {
            put("data",
                buildJsonObject {
                    put(
                        "searchVaccine",
                        buildJsonObject {
                            put("count", 1)
                            put("vaccines", buildJsonArray {
                                add(buildJsonObject {
                                    put("description", "romano")
                                })
                            })
                        })
                })
        }, response.body())
    }

    @Test
    fun `When DELETE vaccine, returns UNAUTHORIZED`() = testApplication {
        environment {
            config = ApplicationConfig("test-application.conf")
        }
        val scenario = Scenario()
        scenario.setupClient(this, role = Role.USER)
        scenario.addLaboratory()
        scenario.addResearch()
        scenario.addVaccine()

        val response = scenario.httpClient.post("/graphql") {
            contentType(ContentType.Application.Json)
            setBody(buildJsonObject {
                put(
                    "query",
                    "mutation {  deleteVaccine(id: 1) {    id  }}"
                )
            })
        }
        val responseAsJson = Json.parseToJsonElement(response.bodyAsText())

        assertEquals(HttpStatusCode.OK, response.status)
        assertEquals(
            "Unauthorized: this requires the role of SALES_MANAGER",
            responseAsJson.jsonObject["errors"]?.jsonArray?.get(0)?.jsonObject?.get("message")?.jsonPrimitive?.content
        )
    }

    @Test
    fun `When DELETE vaccine, returns OK`() = testApplication {
        environment {
            config = ApplicationConfig("test-application.conf")
        }
        val scenario = Scenario()
        scenario.setupClient(this, role = Role.SALES_MANAGER)
        scenario.addLaboratory()
        scenario.addResearch()
        scenario.addVaccine()

        val response = scenario.httpClient.post("/graphql") {
            contentType(ContentType.Application.Json)
            setBody(buildJsonObject {
                put(
                    "query",
                    "mutation { deleteVaccine(id: 1) { id }}"
                )
            })
        }

        assertEquals(HttpStatusCode.OK, response.status)
        assertEquals(
            buildJsonObject {
                put("data", buildJsonObject {
                    put("deleteVaccine", buildJsonObject {
                        put("id", 1)
                    })
                })
            },
            response.body()
        )
    }
}