package com.github.dannful

import com.github.dannful.plugins.*
import io.ktor.server.application.*
import io.ktor.server.netty.*

fun main(args: Array<String>) {
    EngineMain.main(args)
}

fun Application.module() {
    configureKoin()
    configureDatabases()
    configureSessions()
    configureSecurity()
    configureMonitoring()
    configureSerialization()
    configureRouting()
    configureCORS()
}