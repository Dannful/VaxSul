package com.github.dannful.data.entity

import com.github.dannful.domain.model.PurchaseStatus
import org.jetbrains.exposed.dao.id.IntIdTable
import org.jetbrains.exposed.sql.ReferenceOption
import org.jetbrains.exposed.sql.kotlin.datetime.CurrentTimestamp
import org.jetbrains.exposed.sql.kotlin.datetime.datetime

object Purchases : IntIdTable() {

    val userId = reference("userId", Users, onDelete = ReferenceOption.CASCADE, onUpdate = ReferenceOption.CASCADE)
    val vaccineId =
        reference("vaccineId", Vaccines, onDelete = ReferenceOption.CASCADE, onUpdate = ReferenceOption.CASCADE)
    val amount = integer("amount").check(name = "is_amount_valid") {
        it greaterEq 1
    }
    val timestamp = datetime("timestamp").defaultExpression(CurrentTimestamp())
    val totalSpent = float("totalSpent").check(name = "is_total_spent_valid") {
        it greater 0f
    }
    val status = enumeration<PurchaseStatus>("status")
}