package com.github.dannful.routes

import com.github.dannful.core.Scenario
import com.github.dannful.domain.model.Laboratory
import io.ktor.client.call.*
import io.ktor.client.request.*
import io.ktor.http.*
import io.ktor.server.config.*
import io.ktor.server.testing.*
import kotlin.test.Test
import kotlin.test.assertEquals

class LaboratoryRoutesKtTest {

    @Test
    fun `When creates laboratory, returns 200 (OK)`() = testApplication {
        environment {
            config = ApplicationConfig("test-application.conf")
        }
        val scenario = Scenario()
        scenario.setupClient(this)
        val testLaboratory = Laboratory(
            name = "oi",
            description = "oi",
            cnpj = "12356"
        )
        val newLaboratoryResponse = scenario.httpClient.post("/laboratory/new") {
            contentType(ContentType.Application.Json)
            setBody(
                testLaboratory
            )
        }

        val laboratory = scenario.laboratoryService.getLaboratory(1)

        assertEquals(HttpStatusCode.OK, newLaboratoryResponse.status)
        assertEquals(testLaboratory, laboratory)
    }

    @Test
    fun `When updates laboratory, returns 200 (OK)`() = testApplication {
        environment {
            config = ApplicationConfig("test-application.conf")
        }
        val scenario = Scenario()
        scenario.setupClient(this)
        val testLaboratory = scenario.addLaboratory().copy(
            description = "adwaidadad",
            id = 1
        )
        val newLaboratoryResponse = scenario.httpClient.post("/laboratory/new") {
            contentType(ContentType.Application.Json)
            setBody(
                testLaboratory
            )
        }

        val laboratory = scenario.laboratoryService.getLaboratory(1)

        assertEquals(HttpStatusCode.OK, newLaboratoryResponse.status)
        assertEquals(testLaboratory, laboratory)
    }

    @Test
    fun `When gets all laboratories, returns 200 (OK)`() = testApplication {
        environment {
            config = ApplicationConfig("test-application.conf")
        }
        val scenario = Scenario()
        scenario.setupClient(this)
        val testLaboratory = Laboratory(
            name = "oi",
            description = "oi",
            cnpj = "12356"
        )
        val newLaboratoryResponse = scenario.httpClient.post("/laboratory/new") {
            contentType(ContentType.Application.Json)
            setBody(
                testLaboratory
            )
        }

        val laboratory = scenario.laboratoryService.getLaboratories()

        assertEquals(HttpStatusCode.OK, newLaboratoryResponse.status)
        assertEquals(testLaboratory, laboratory.firstOrNull())
    }

    @Test
    fun `When gets laboratory by ID, returns 200 (OK)`() = testApplication {
        environment {
            config = ApplicationConfig("test-application.conf")
        }
        val scenario = Scenario()
        scenario.setupClient(this)
        val testLaboratory = scenario.addLaboratory()
        val newLaboratoryResponse = scenario.httpClient.get("/laboratory/1")

        assertEquals(HttpStatusCode.OK, newLaboratoryResponse.status)
        assertEquals(testLaboratory, newLaboratoryResponse.body())
    }
}