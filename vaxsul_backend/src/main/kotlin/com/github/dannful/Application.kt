package com.github.dannful

import com.github.dannful.plugins.*
import io.ktor.server.application.*
import io.ktor.server.engine.*
import io.ktor.server.netty.*
import org.koin.ktor.plugin.Koin

fun main(args: Array<String>) {
    EngineMain.main(args)
}

fun Application.module() {
    configureKoin()
    configureDatabases()
    configureSecurity()
    configureMonitoring()
    configureSerialization()
    configureRouting()
    configureCORS()
}