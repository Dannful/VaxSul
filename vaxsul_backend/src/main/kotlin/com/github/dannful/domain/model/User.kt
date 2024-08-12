package com.github.dannful.domain.model

import kotlinx.datetime.LocalDate
import kotlinx.serialization.Serializable

@Serializable
data class User(
    val email: String,
    val name: String,
    val password: String,
    val role: Role = Role.USER,
    val cpf: String,
    val phone: String,
    val birthday: LocalDate,
    val laboratoryId: Int? = null
)

@Serializable
data class IdUser(
    val id: Int,
    val email: String,
    val name: String,
    val password: String,
    val role: Role = Role.USER,
    val cpf: String,
    val phone: String,
    val birthday: LocalDate,
    val laboratoryId: Int? = null
)
