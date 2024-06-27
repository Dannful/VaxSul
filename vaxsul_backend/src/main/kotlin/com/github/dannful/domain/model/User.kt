package com.github.dannful.domain.model

import kotlinx.serialization.Serializable

@Serializable
data class User(
    val email: String,
    val username: String,
    val password: String,
    val role: Role
)
