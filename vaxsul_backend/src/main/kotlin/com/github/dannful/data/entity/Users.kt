package com.github.dannful.data.entity

import com.github.dannful.domain.model.Role
import org.jetbrains.exposed.dao.id.IntIdTable
import org.jetbrains.exposed.sql.kotlin.datetime.date
import org.jetbrains.exposed.sql.kotlin.datetime.datetime

object Users : IntIdTable() {

    val email = varchar("email", 255).uniqueIndex().check(name = "check_valid_email") { it.match("%_@__%.__%") }
    val name = varchar("name", 255)
    val password = varchar("password", 64)
    val role = enumeration("role", Role::class).default(Role.USER)
    val cpf = varchar("cpf", 11)
    val birthday = date("birthday")
    val phone = varchar("phone", 16)
    val laboratoryId = reference("laboratoryId", Laboratories).nullable().default(null)
}