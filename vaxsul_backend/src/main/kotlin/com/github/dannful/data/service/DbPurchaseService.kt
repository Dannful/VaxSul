package com.github.dannful.data.service

import com.github.dannful.data.dao.PurchasesDao
import com.github.dannful.data.entity.Purchases
import com.github.dannful.data.entity.Users
import com.github.dannful.data.entity.Vaccines
import com.github.dannful.domain.model.Purchase
import com.github.dannful.domain.service.DispatcherProvider
import com.github.dannful.domain.service.PurchaseService
import org.jetbrains.exposed.dao.id.EntityID
import org.jetbrains.exposed.sql.Database
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq
import org.jetbrains.exposed.sql.transactions.experimental.newSuspendedTransaction

class DbPurchaseService(
    private val dispatcherProvider: DispatcherProvider,
    private val database: Database
) : PurchaseService {

    override suspend fun add(purchase: Purchase) {
        newSuspendedTransaction(context = dispatcherProvider.io, db = database) {
            if (purchase.id != null) {
                val foundPurchase = PurchasesDao.findById(purchase.id) ?: return@newSuspendedTransaction
                if (purchase.userId != null)
                    foundPurchase.userId = EntityID(purchase.userId, Users)
                foundPurchase.vaccineId = EntityID(purchase.vaccineId, Users)
                foundPurchase.amount = purchase.amount
                if (purchase.timestamp != null)
                    foundPurchase.timestamp = purchase.timestamp
                foundPurchase.totalSpent = purchase.totalSpent
                return@newSuspendedTransaction
            }
            PurchasesDao.new {
                if (purchase.userId != null)
                    userId = EntityID(purchase.userId, Users)
                vaccineId = EntityID(purchase.vaccineId, Vaccines)
                amount = purchase.amount
                totalSpent = purchase.totalSpent
                if (purchase.timestamp != null)
                    timestamp = purchase.timestamp
            }
        }
    }

    override suspend fun getForUser(userId: Int): List<Purchase> =
        newSuspendedTransaction(context = dispatcherProvider.io, db = database) {
            PurchasesDao.find(op = Purchases.userId eq userId).map { it.toPurchase() }
        }

    override suspend fun getById(id: Int): Purchase? =
        newSuspendedTransaction(context = dispatcherProvider.io, db = database) {
            PurchasesDao.findById(id)?.toPurchase()
        }
}