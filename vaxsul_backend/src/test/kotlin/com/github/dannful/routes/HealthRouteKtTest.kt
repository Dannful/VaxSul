package com.github.dannful.routes

import io.ktor.client.request.*
import io.ktor.client.statement.*
import io.ktor.http.*
import io.ktor.server.config.*
import io.ktor.server.testing.*
import kotlin.test.Test
import kotlin.test.assertEquals

class HealthRouteKtTest {

    @Test
    fun `When GET health, returns OK`() = testApplication {
        environment {
            config = ApplicationConfig("test-application.conf")
        }
        val response = client.get("/health")

        assertEquals(HttpStatusCode.OK, response.status)
        assertEquals("Ok", response.bodyAsText())
    }
}