package com.github.dannful.data.entity

import com.github.dannful.domain.model.Role
import org.jetbrains.exposed.dao.id.IntIdTable

object Users : IntIdTable() {

    val email = varchar("email", 255).uniqueIndex().check(name = "check_valid_email") { it.match("%_@__%.__%") }
    val name = varchar("name", 255)
    val password = varchar("password", 64)
    val role = enumeration("role", Role::class).default(Role.USER)
    val state = varchar("state", 255)
    val city = varchar("city", 255)
}