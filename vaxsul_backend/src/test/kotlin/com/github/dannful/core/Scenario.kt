package com.github.dannful.core

import com.github.dannful.data.entity.ResearchDesignations
import com.github.dannful.data.entity.Researches
import com.github.dannful.data.entity.Users
import com.github.dannful.data.entity.Vaccines
import com.github.dannful.data.service.DbResearchService
import com.github.dannful.data.service.DbUserService
import com.github.dannful.data.service.DbVaccineService
import com.github.dannful.data.service.DefaultDispatcherProvider
import com.github.dannful.domain.model.*
import com.github.dannful.domain.service.ResearchService
import com.github.dannful.domain.service.UserService
import com.github.dannful.domain.service.VaccineService
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
        transaction {
            SchemaUtils.drop(Users, Vaccines, Researches, ResearchDesignations)
            SchemaUtils.create(Users, Vaccines, Researches, ResearchDesignations)
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

    suspend fun setupClient(applicationTestBuilder: ApplicationTestBuilder, role: Role) {
        httpClient = applicationTestBuilder.createClient {
            install(ContentNegotiation) {
                json()
            }
            install(HttpCookies)
        }
        userService.addUser(
            User(
                email = "test@email.com",
                name = "test",
                password = "test",
                role = role,
                state = "RS",
                city = "Itapema"
            )
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
            status = ResearchStatus.IN_PROGRESS
        )
        researchService.addResearch(
            research
        )
        return research
    }

    suspend fun addVaccine(): Vaccine {
        val vaccine = Vaccine(
            pricePerUnit = 1.0f,
            amountInStock = 3,
            sellable = true
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
            state = "RS",
            city = "Haddonfield"
        )
        userService.addUser(user)
        return user
    }
}