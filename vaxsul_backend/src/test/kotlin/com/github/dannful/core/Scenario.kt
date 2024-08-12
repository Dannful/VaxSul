package com.github.dannful.core

import com.github.dannful.data.entity.*
import com.github.dannful.data.service.*
import com.github.dannful.domain.model.*
import com.github.dannful.domain.service.*
import io.ktor.client.*
import io.ktor.client.plugins.auth.*
import io.ktor.client.plugins.auth.providers.*
import io.ktor.client.plugins.contentnegotiation.*
import io.ktor.client.plugins.cookies.*
import io.ktor.client.request.*
import io.ktor.http.*
import io.ktor.serialization.kotlinx.json.*
import io.ktor.server.config.*
import io.ktor.server.testing.*
import kotlinx.datetime.LocalDate
import kotlinx.datetime.LocalDateTime
import org.jetbrains.exposed.sql.Database
import org.jetbrains.exposed.sql.SchemaUtils
import org.jetbrains.exposed.sql.transactions.transaction

class Scenario {

    lateinit var httpClient: HttpClient
    private var database: Database

    var researchService: ResearchService
    var userService: UserService
    var vaccineService: VaccineService
    var purchaseService: PurchaseService
    var laboratoryService: LaboratoryService

    init {
        val applicationConfig = ApplicationConfig("test-application.conf")
        database = Database.connect(
            url = applicationConfig.property("db.url").getString(),
            driver = "com.impossibl.postgres.jdbc.PGDriver",
            user = applicationConfig.property("db.user").getString(),
            password = applicationConfig.property("db.password").getString()
        )
        researchService = DbResearchService(
            dispatcherProvider = DefaultDispatcherProvider(), database = database
        )
        userService = DbUserService(
            dispatcherProvider = DefaultDispatcherProvider(), database = database
        )
        vaccineService = DbVaccineService(
            dispatcherProvider = DefaultDispatcherProvider(), database = database
        )
        purchaseService = DbPurchaseService(
            dispatcherProvider = DefaultDispatcherProvider(), database = database
        )
        laboratoryService = DbLaboratoryService(
            dispatcherProvider = DefaultDispatcherProvider(), database = database
        )
        transaction {
            SchemaUtils.drop(Users, Vaccines, Researches, ResearchDesignations, Purchases, Laboratories)
            SchemaUtils.create(Users, Vaccines, Researches, ResearchDesignations, Purchases, Laboratories)
        }
    }

    fun setupClient(applicationTestBuilder: ApplicationTestBuilder) {
        httpClient = applicationTestBuilder.createClient {
            install(ContentNegotiation) {
                json()
            }
            install(Auth) {
                basic {
                    credentials {
                        BasicAuthCredentials(username = "adm", password = "123")
                    }
                    sendWithoutRequest { true }
                }
            }
            install(HttpCookies)
        }
    }

    suspend fun setupClient(applicationTestBuilder: ApplicationTestBuilder, role: Role): User {
        httpClient = applicationTestBuilder.createClient {
            install(ContentNegotiation) {
                json()
            }
            install(HttpCookies)
        }
        val user = User(
            email = "test@email.com",
            name = "test",
            password = "test",
            role = role,
            cpf = "1234567890",
            phone = "12345567",
            birthday = LocalDate(2024, 3, 3)
        )
        userService.addUser(
            user
        )
        httpClient.post("/login") {
            contentType(ContentType.Application.Json)
            setBody(
                Credentials(
                    email = "test@email.com",
                    password = "test"
                )
            )
        }
        return user
    }

    suspend fun addResearch(): Research {
        val research = Research(
            startDate = LocalDateTime(
                year = 2024,
                monthNumber = 1,
                dayOfMonth = 1,
                hour = 1,
                minute = 1,
                second = 1,
            ),
            status = ResearchStatus.IN_PROGRESS,
            name = "romano",
            description = "description",
            report = "report",
            laboratoryId = 1
        )
        researchService.addResearch(
            research
        )
        return research
    }

    suspend fun addVaccine(): Vaccine {
        val vaccine = Vaccine(
            researchId = 1,
            pricePerUnit = 1.0f,
            amountInStock = 3,
            dose = 1,
            description = "romano",
            name = "romano"
        )
        vaccineService.addVaccine(vaccine)
        return vaccine
    }

    suspend fun addUser(): User {
        val user = User(
            email = "romano@email.com",
            name = "romano",
            password = "test",
            role = Role.USER,
            cpf = "12345667",
            phone = "12345567",
            birthday = LocalDate(2024, 3, 3)
        )
        userService.addUser(user)
        return user
    }

    suspend fun addPurchase(): Purchase {
        val purchase = Purchase(
            userId = 1,
            vaccineId = 1,
            totalSpent = 30f,
            amount = 3,
            timestamp = LocalDateTime(3000, 3, 3, 3, 3, 3),
            status = PurchaseStatus.IN_VALIDATION
        )
        purchaseService.add(purchase)
        return purchase
    }

    suspend fun addLaboratory(): Laboratory {
        val laboratory = Laboratory(
            name = "romano",
            description = "romano",
            cnpj = "123456"
        )
        laboratoryService.addLaboratory(laboratory)
        return laboratory
    }
}