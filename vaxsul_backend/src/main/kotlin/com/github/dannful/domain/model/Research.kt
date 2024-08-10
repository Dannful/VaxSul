package com.github.dannful.domain.model

import kotlinx.datetime.LocalDateTime
import kotlinx.serialization.Serializable

@Serializable
data class Research(
    val id: Int? = null,
    val startDate: LocalDateTime,
    val status: ResearchStatus,
    val progress: Float = 0f
) {
    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false

        other as Research

        if (startDate != other.startDate) return false
        if (status != other.status) return false
        if (progress != other.progress) return false

        return true
    }

    override fun hashCode(): Int {
        var result = startDate.hashCode()
        result = 31 * result + status.hashCode()
        result = 31 * result + progress.hashCode()
        return result
    }
}
