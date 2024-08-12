package com.github.dannful.domain.model

import kotlinx.serialization.Serializable

@Serializable
data class VaccineSearchResult(
    val count: Long,
    val vaccines: List<IdVaccine>
)
