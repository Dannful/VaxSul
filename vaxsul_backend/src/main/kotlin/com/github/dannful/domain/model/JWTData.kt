package com.github.dannful.domain.model

data class JWTData(
    val secret: String,
    val issuer: String,
    val audience: String,
    val realm: String
)
