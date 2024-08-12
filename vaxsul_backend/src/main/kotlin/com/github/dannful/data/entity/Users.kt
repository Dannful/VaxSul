package com.github.dannful.data.entity

import com.github.dannful.domain.model.Role
import org.jetbrains.exposed.dao.id.IntIdTable
import org.jetbrains.exposed.sql.kotlin.datetime.date

object Users : IntIdTable() {

    val email = varchar("email", 255).uniqueIndex().check(name = "check_valid_email") { it.match("%_@__%.__%") }
    val name = varchar("name", 255)
    val password = varchar("password", 64)
    val role = varchar("role", 16).default(Role.USER.name).check(name = "check_valid_role") {
        it inList Role.entries.map { role -> role.name }
    }
    val cpf = varchar("cpf", 11)
    val birthday = date("birthday")
    val phone = varchar("phone", 16)
    val laboratoryId = reference("laboratoryId", Laboratories).nullable().default(null)
}