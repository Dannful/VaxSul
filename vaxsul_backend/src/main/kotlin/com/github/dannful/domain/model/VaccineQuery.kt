package com.github.dannful.domain.model

import kotlinx.serialization.Serializable

@Serializable
data class VaccineQuery(
    val name: String?,
    val minimumPrice: Float?,
    val maximumPrice: Float?,
)
