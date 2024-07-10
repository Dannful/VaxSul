package com.github.dannful.domain.model

import kotlinx.serialization.Serializable

@Serializable
data class User(
    val email: String,
    val name: String,
    val password: String,
    val role: Role = Role.USER,
    val state: String,
    val city: String
)
