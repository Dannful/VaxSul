package com.github.dannful.routes

import io.ktor.client.request.*
import io.ktor.client.statement.*
import io.ktor.http.*
import io.ktor.server.testing.*
import kotlin.test.Test
import kotlin.test.assertEquals

class HealthRouteKtTest {

    @Test
    fun testGetHealth() = testApplication {
        application {
            healthRoute()
        }
        val response = client.get("/health")

        assertEquals(HttpStatusCode.OK, response.status)
        assertEquals("Ok", response.bodyAsText())
    }
}