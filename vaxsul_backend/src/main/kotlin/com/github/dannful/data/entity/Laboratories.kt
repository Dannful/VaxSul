package com.github.dannful.data.entity

import org.jetbrains.exposed.dao.id.IntIdTable

object Laboratories : IntIdTable() {

    val name = varchar("name", 255)
    val description = varchar("description", 255)
    val cnpj = varchar("cnpj", 14)
}