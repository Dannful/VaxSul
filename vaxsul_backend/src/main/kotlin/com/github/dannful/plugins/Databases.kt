package com.github.dannful.plugins

import com.github.dannful.data.entity.*
import io.ktor.server.application.*
import org.jetbrains.exposed.sql.Database
import org.jetbrains.exposed.sql.SchemaUtils
import org.jetbrains.exposed.sql.transactions.TransactionManager
import org.jetbrains.exposed.sql.transactions.transaction
import org.koin.ktor.ext.inject

fun Application.configureDatabases() {
    val database: Database by inject()

    TransactionManager.defaultDatabase = database

    transaction(database) {
        SchemaUtils.create(Users, Researches, Vaccines, Laboratories, Purchases)
    }
}