package com.github.dannful.domain.model

import kotlinx.serialization.Serializable

@Serializable
data class Vaccine(
    val pricePerUnit: Float,
    val amountInStock: Int,
    val researchId: Int,
    val dose: Int,
    val description: String,
    val name: String
)

@Serializable
data class IdVaccine(
    val id: Int,
    val pricePerUnit: Float,
    val amountInStock: Int,
    val researchId: Int,
    val dose: Int,
    val description: String,
    val name: String
)
