package com.github.dannful.domain.model

import kotlinx.datetime.LocalDateTime
import kotlinx.serialization.Serializable

@Serializable
data class Research(
    val id: Int? = null,
    val startDate: LocalDateTime,
    val status: ResearchStatus
)
