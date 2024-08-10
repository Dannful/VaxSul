package com.github.dannful.data.dao

import com.github.dannful.data.entity.Purchases
import com.github.dannful.domain.model.Purchase
import org.jetbrains.exposed.dao.IntEntity
import org.jetbrains.exposed.dao.IntEntityClass
import org.jetbrains.exposed.dao.id.EntityID

class PurchasesDao(idEntityID: EntityID<Int>) : IntEntity(idEntityID) {

    companion object : IntEntityClass<PurchasesDao>(Purchases)

    var userId by Purchases.userId
    var vaccineId by Purchases.vaccineId
    var amount by Purchases.amount
    var timestamp by Purchases.timestamp
    var totalSpent by Purchases.totalSpent

    fun toPurchase() = Purchase(
        id = id.value,
        vaccineId = vaccineId.value,
        amount = amount,
        timestamp = timestamp,
        totalSpent = totalSpent,
        userId = userId.value
    )
}