package com.github.dannful.domain.model

import kotlinx.serialization.Serializable

@Serializable
data class Laboratory(
    val name: String,
    val description: String,
    val cnpj: String
)

@Serializable
data class IdLaboratory(
    val id: Int,
    val name: String,
    val description: String,
    val cnpj: String
)
