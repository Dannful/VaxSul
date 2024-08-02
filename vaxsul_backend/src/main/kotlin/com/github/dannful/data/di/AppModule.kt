package com.github.dannful.data.di

import com.github.dannful.data.service.DbResearchService
import com.github.dannful.data.service.DbUserService
import com.github.dannful.data.service.DbVaccineService
import com.github.dannful.data.service.DefaultDispatcherProvider
import com.github.dannful.domain.model.JWTData
import com.github.dannful.domain.service.DispatcherProvider
import com.github.dannful.domain.service.ResearchService
import com.github.dannful.domain.service.UserService
import com.github.dannful.domain.service.VaccineService
import io.ktor.server.application.*
import io.ktor.server.sessions.*
import io.ktor.util.*
import org.jetbrains.exposed.sql.Database
import org.koin.dsl.module

fun appModule(environment: ApplicationEnvironment) = module {
    single<DispatcherProvider> {
        DefaultDispatcherProvider()
    }

    single<Database> {
        val databaseUrl = environment.config.propertyOrNull("db.url")?.getString()
            ?: throw IllegalArgumentException("Database URL is undefined. Please provide it as an environment variable named DB_URL.")
        val user = environment.config.propertyOrNull("db.user")?.getString()
            ?: throw IllegalArgumentException("Database user is undefined. Please provide it as an environment variable named DB_USER.")
        val password = environment.config.propertyOrNull("db.password")?.getString() ?: throw IllegalArgumentException(
            "Database password is undefined. Please provide it as an environment variable named DB_PASSWORD."
        )
        Database.connect(
            url = databaseUrl,
            driver = "com.impossibl.postgres.jdbc.PGDriver",
            user = user,
            password = password
        )
    }

    single {
        JWTData(
            issuer = environment.config.property("auth.jwt.issuer").getString(),
            audience = environment.config.property("auth.jwt.audience").getString(),
            realm = environment.config.property("auth.jwt.realm").getString(),
            secret = environment.config.property("auth.jwt.secret").getString(),
        )
    }

    single {
        SessionTransportTransformerEncrypt(
            hex(environment.config.property("auth.cookie.encrypt_key").getString()),
            hex(environment.config.property("auth.cookie.sign_key").getString())
        )
    }

    single<UserService> {
        DbUserService(dispatcherProvider = get(), database = get())
    }

    single<VaccineService> {
        DbVaccineService(dispatcherProvider = get(), database = get())
    }

    single<ResearchService> {
        DbResearchService(dispatcherProvider = get(), database = get())
    }
}