package com.github.dannful.routes

import com.github.dannful.core.Scenario
import com.github.dannful.domain.model.Purchase
import io.ktor.client.call.*
import io.ktor.client.request.*
import io.ktor.http.*
import io.ktor.server.config.*
import io.ktor.server.testing.*
import kotlinx.datetime.LocalDateTime
import kotlin.test.Test
import kotlin.test.assertEquals

class PurchaseRoutesKtTest {

    @Test
    fun `When creates purchase, returns 200 (OK)`() = testApplication {
        environment {
            config = ApplicationConfig("test-application.conf")
        }
        val scenario = Scenario()
        scenario.addUser()
        scenario.addVaccine()
        val testPurchase = Purchase(
            userId = 1,
            vaccineId = 1,
            totalSpent = 1f,
            amount = 1,
            timestamp = LocalDateTime(2021, 1, 1, 1, 1),
        )
        scenario.setupClient(this)
        val newPurchaseResponse = scenario.httpClient.post("/purchase/new") {
            contentType(ContentType.Application.Json)
            setBody(
                testPurchase
            )
        }

        val purchase = scenario.purchaseService.getById(1)

        assertEquals(HttpStatusCode.OK, newPurchaseResponse.status)
        assertEquals(testPurchase, purchase)
    }

    @Test
    fun `When updates purchase, returns 200 (OK)`() = testApplication {
        environment {
            config = ApplicationConfig("test-application.conf")
        }
        val scenario = Scenario()
        scenario.addUser()
        scenario.addVaccine()
        val testPurchase = scenario.addPurchase().copy(
            id = 1,
            totalSpent = 9f,
            amount = 3
        )
        scenario.setupClient(this)
        val newPurchaseResponse = scenario.httpClient.post("/purchase/new") {
            contentType(ContentType.Application.Json)
            setBody(
                testPurchase
            )
        }

        val purchase = scenario.purchaseService.getById(1)

        assertEquals(HttpStatusCode.OK, newPurchaseResponse.status)
        assertEquals(testPurchase, purchase)
    }

    @Test
    fun `When searches for user's purchase, returns 200 (OK)`() = testApplication {
        environment {
            config = ApplicationConfig("test-application.conf")
        }
        val scenario = Scenario()
        scenario.addUser()
        scenario.addVaccine()
        val testPurchase = scenario.addPurchase()
        scenario.setupClient(this)
        val newPurchaseResponse = scenario.httpClient.get("/purchase/user/1")

        assertEquals(HttpStatusCode.OK, newPurchaseResponse.status)
        assertEquals(testPurchase, newPurchaseResponse.body<List<Purchase>>().firstOrNull())
    }
}