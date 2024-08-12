package com.github.dannful.routes

import com.github.dannful.core.Scenario
import com.github.dannful.domain.model.Role
import io.ktor.client.call.*
import io.ktor.client.request.*
import io.ktor.http.*
import io.ktor.server.config.*
import io.ktor.server.testing.*
import kotlinx.serialization.json.*
import kotlin.test.Test
import kotlin.test.assertEquals

class PurchaseRouteKtTest {

    @Test
    fun `When GET purchases, returns OK`() = testApplication {
        environment {
            config = ApplicationConfig("test-application.conf")
        }
        val scenario = Scenario()
        scenario.setupClient(this, role = Role.SALES_MANAGER)
        scenario.addLaboratory()
        scenario.addResearch()
        scenario.addVaccine()
        scenario.addPurchase()

        val response = scenario.httpClient.post("/graphql") {
            contentType(ContentType.Application.Json)
            setBody(buildJsonObject {
                put("query", "{ purchases { id } }")
            })
        }

        assertEquals(HttpStatusCode.OK, response.status)
        assertEquals(buildJsonObject {
            put("data", buildJsonObject {
                put("purchases", buildJsonArray {
                    add(
                        buildJsonObject {
                            put("id", 1)
                        })
                })
            })
        }, response.body())
    }

    @Test
    fun `When GET purchases by ID, returns OK`() = testApplication {
        environment {
            config = ApplicationConfig("test-application.conf")
        }
        val scenario = Scenario()
        scenario.setupClient(this, role = Role.USER)
        scenario.addLaboratory()
        scenario.addResearch()
        scenario.addVaccine()
        scenario.addPurchase()

        val response = scenario.httpClient.post("/graphql") {
            contentType(ContentType.Application.Json)
            setBody(buildJsonObject {
                put(
                    "query",
                    "{ purchase(id: 1) { id } }"
                )
            })
        }

        assertEquals(HttpStatusCode.OK, response.status)
        assertEquals(buildJsonObject {
            put("data", buildJsonObject {
                put("purchase",
                    buildJsonObject {
                        put("id", 1)
                    })
            })
        }, response.body())
    }

    @Test
    fun `When GET purchases by user ID, returns OK`() = testApplication {
        environment {
            config = ApplicationConfig("test-application.conf")
        }
        val scenario = Scenario()
        scenario.setupClient(this, role = Role.USER)
        scenario.addLaboratory()
        scenario.addResearch()
        scenario.addVaccine()
        scenario.addPurchase()

        val response = scenario.httpClient.post("/graphql") {
            contentType(ContentType.Application.Json)
            setBody(buildJsonObject {
                put(
                    "query",
                    "{ userPurchases(userId: 1) { id } }"
                )
            })
        }

        assertEquals(HttpStatusCode.OK, response.status)
        assertEquals(buildJsonObject {
            put("data", buildJsonObject {
                put("userPurchases", buildJsonArray {
                    add(buildJsonObject {
                        put("id", 1)
                    })
                })
            })
        }, response.body())
    }
}