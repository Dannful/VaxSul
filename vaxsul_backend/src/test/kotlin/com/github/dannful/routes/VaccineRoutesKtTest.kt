package com.github.dannful.routes

import com.github.dannful.core.Scenario
import com.github.dannful.domain.model.Role
import com.github.dannful.domain.model.Vaccine
import io.ktor.client.call.*
import io.ktor.client.request.*
import io.ktor.http.*
import io.ktor.server.config.*
import io.ktor.server.testing.*
import kotlin.test.Test
import kotlin.test.assertEquals

class VaccineRoutesKtTest {

    @Test
    fun `When creates vaccine, returns 200 (OK)`() = testApplication {
        environment {
            config = ApplicationConfig("test-application.conf")
        }
        val scenario = Scenario()
        scenario.setupClient(this, Role.SALES_MANAGER)
        val testVaccine = Vaccine(
            pricePerUnit = 1.0f,
            amountInStock = 3,
            sellable = false,
            name = "romano",
            description = "romano",
            dose = 1
        )
        val newVaccineResponse = scenario.httpClient.post("/vaccines/new") {
            contentType(ContentType.Application.Json)
            setBody(
                testVaccine
            )
        }

        val vaccine = scenario.vaccineService.getVaccineById(1)

        assertEquals(HttpStatusCode.OK, newVaccineResponse.status)
        assertEquals(testVaccine, vaccine)
    }

    @Test
    fun `When gets all vaccines, returns 200 (OK)`() = testApplication {
        environment {
            config = ApplicationConfig("test-application.conf")
        }
        val scenario = Scenario()
        scenario.setupClient(this, Role.SALES_MANAGER)
        val vaccine = scenario.addVaccine()

        val getVaccines = scenario.httpClient.get("/vaccines")

        assertEquals(HttpStatusCode.OK, getVaccines.status)
        assertEquals(listOf(vaccine), getVaccines.body())
    }

    @Test
    fun `When gets vaccine by ID, returns 200 (OK)`() = testApplication {
        environment {
            config = ApplicationConfig("test-application.conf")
        }
        val scenario = Scenario()
        scenario.setupClient(this, Role.SALES_MANAGER)
        val vaccine = scenario.addVaccine()

        val getNewVaccineResponse = scenario.httpClient.get("/vaccines/1")

        assertEquals(HttpStatusCode.OK, getNewVaccineResponse.status)
        assertEquals(vaccine, getNewVaccineResponse.body())
    }

    @Test
    fun `When there is no valid vaccine for given ID, returns 400 (Bad Request)`() = testApplication {
        environment {
            config = ApplicationConfig("test-application.conf")
        }
        val scenario = Scenario()
        scenario.setupClient(this, Role.SALES_MANAGER)

        val getVaccineResponse = scenario.httpClient.get("/vaccines/1")

        assertEquals(HttpStatusCode.BadRequest, getVaccineResponse.status)
    }

    @Test
    fun `When user is not authorized and deletes vaccine, returns 401 (Unauthorized)`() = testApplication {
        environment {
            config = ApplicationConfig("test-application.conf")
        }
        val scenario = Scenario()
        scenario.setupClient(this, Role.RESEARCH_LEAD)
        scenario.addVaccine()

        val deleteVaccineRequest = scenario.httpClient.delete("/vaccines/1")

        assertEquals(HttpStatusCode.Unauthorized, deleteVaccineRequest.status)
    }

    @Test
    fun `When user is authorized and deletes vaccine, returns 200 (OK)`() = testApplication {
        environment {
            config = ApplicationConfig("test-application.conf")
        }
        val scenario = Scenario()
        scenario.setupClient(this, Role.SALES_MANAGER)
        scenario.addVaccine()

        val deleteVaccineRequest = scenario.httpClient.delete("/vaccines/1")

        val vaccinesCount = scenario.researchService.getResearches().count()
        assertEquals(HttpStatusCode.OK, deleteVaccineRequest.status)
        assertEquals(0, vaccinesCount)
    }

    @Test
    fun `When searches vaccine by name, returns 200 (OK)`() = testApplication {
        environment {
            config = ApplicationConfig("test-application.conf")
        }
        val scenario = Scenario()
        scenario.setupClient(this, role = Role.USER)
        val vaccine = scenario.addVaccine()

        val getNewVaccineResponse = scenario.httpClient.get("/vaccines?name=romano")

        assertEquals(HttpStatusCode.OK, getNewVaccineResponse.status)
        assertEquals(vaccine, getNewVaccineResponse.body<List<Vaccine>>().first())
    }

    @Test
    fun `When searches vaccine by price, returns 200 (OK)`() = testApplication {
        environment {
            config = ApplicationConfig("test-application.conf")
        }
        val scenario = Scenario()
        scenario.setupClient(this, role = Role.USER)
        val vaccine = scenario.addVaccine()

        val getNewVaccineResponse = scenario.httpClient.get("/vaccines?minimumPrice=0&maximumPrice=1")

        assertEquals(HttpStatusCode.OK, getNewVaccineResponse.status)
        assertEquals(vaccine, getNewVaccineResponse.body<List<Vaccine>>().first())
    }

    @Test
    fun `When searches invalid vaccine, returns 200 (OK) with empty list`() = testApplication {
        environment {
            config = ApplicationConfig("test-application.conf")
        }
        val scenario = Scenario()
        scenario.setupClient(this, role = Role.USER)
        scenario.addVaccine()

        val getNewVaccineResponse = scenario.httpClient.get("/vaccines?minimumPrice=3&maximumPrice=6")

        assertEquals(HttpStatusCode.OK, getNewVaccineResponse.status)
        assertEquals(emptyList(), getNewVaccineResponse.body<List<Vaccine>>())
    }
}