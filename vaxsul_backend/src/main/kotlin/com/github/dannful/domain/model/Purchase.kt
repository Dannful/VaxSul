package com.github.dannful.domain.model

import kotlinx.datetime.LocalDateTime
import kotlinx.serialization.Serializable

@Serializable
data class Purchase(
    val id: Int? = null,
    val userId: Int? = null,
    val vaccineId: Int,
    val totalSpent: Float,
    val amount: Int,
    val timestamp: LocalDateTime? = null
) {
    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false

        other as Purchase

        if (userId != other.userId) return false
        if (vaccineId != other.vaccineId) return false
        if (totalSpent != other.totalSpent) return false
        if (amount != other.amount) return false
        if (timestamp != other.timestamp) return false

        return true
    }

    override fun hashCode(): Int {
        var result = userId ?: 0
        result = 31 * result + vaccineId
        result = 31 * result + totalSpent.hashCode()
        result = 31 * result + amount
        result = 31 * result + (timestamp?.hashCode() ?: 0)
        return result
    }
}
