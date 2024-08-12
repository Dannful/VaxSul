package com.github.dannful.domain.model

import kotlinx.datetime.LocalDateTime
import kotlinx.serialization.Serializable

@Serializable
data class Research(
    val laboratoryId: Int,
    val startDate: LocalDateTime,
    val status: ResearchStatus,
    val progress: Float = 0f,
    val name: String,
    val description: String,
    val report: String
)

@Serializable
data class IdResearch(
    val id: Int,
    val laboratoryId: Int,
    val startDate: LocalDateTime,
    val status: ResearchStatus,
    val progress: Float = 0f,
    val name: String,
    val description: String,
    val report: String
)
