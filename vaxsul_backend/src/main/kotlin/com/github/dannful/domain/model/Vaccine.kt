package com.github.dannful.domain.model

import kotlinx.serialization.Serializable

@Serializable
data class Vaccine(
    val pricePerUnit: Float,
    val amountInStock: Int,
    val researchId: Int? = null,
    val sellable: Boolean
)
