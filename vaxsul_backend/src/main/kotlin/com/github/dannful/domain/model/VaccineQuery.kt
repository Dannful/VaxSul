package com.github.dannful.domain.model

import kotlinx.serialization.Serializable

@Serializable
data class VaccineQuery(
    val name: String?,
    val minimumPrice: Float = 0f,
    val maximumPrice: Float = Float.MAX_VALUE,
    val count: Int = Int.MAX_VALUE,
    val amountInStock: Int = 1,
    val sellable: Boolean? = null
)
