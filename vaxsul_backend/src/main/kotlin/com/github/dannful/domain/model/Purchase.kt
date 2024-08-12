package com.github.dannful.domain.model

import kotlinx.datetime.LocalDateTime
import kotlinx.serialization.Serializable

@Serializable
data class Purchase(
    val userId: Int,
    val vaccineId: Int,
    val totalSpent: Float,
    val amount: Int,
    val timestamp: LocalDateTime? = null,
    val status: PurchaseStatus
)

@Serializable
data class IdPurchase(
    val id: Int,
    val userId: Int,
    val vaccineId: Int,
    val totalSpent: Float,
    val amount: Int,
    val timestamp: LocalDateTime? = null,
    val status: PurchaseStatus
)
