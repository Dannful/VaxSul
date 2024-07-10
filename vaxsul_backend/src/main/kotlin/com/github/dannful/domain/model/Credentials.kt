package com.github.dannful.domain.model

import kotlinx.serialization.Serializable

@Serializable
data class Credentials(
    val email: String,
    val password: String
)
