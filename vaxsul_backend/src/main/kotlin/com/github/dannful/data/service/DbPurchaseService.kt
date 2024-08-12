package com.github.dannful.data.service

import com.github.dannful.data.dao.PurchasesDao
import com.github.dannful.data.entity.Purchases
import com.github.dannful.data.entity.Users
import com.github.dannful.data.entity.Vaccines
import com.github.dannful.domain.model.IdPurchase
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

    override suspend fun add(purchase: Purchase): IdPurchase =
        newSuspendedTransaction(context = dispatcherProvider.io, db = database) {
            PurchasesDao.new {
                userId = EntityID(purchase.userId, Users)
                vaccineId = EntityID(purchase.vaccineId, Vaccines)
                amount = purchase.amount
                totalSpent = purchase.totalSpent
                status = purchase.status.name
                if (purchase.timestamp != null)
                    timestamp = purchase.timestamp
            }.toPurchase()
        }

    override suspend fun getAll(): List<IdPurchase> =
        newSuspendedTransaction(context = dispatcherProvider.io, db = database) {
            PurchasesDao.all().map { it.toPurchase() }
        }

    override suspend fun updatePurchase(idPurchase: IdPurchase): IdPurchase? =
        newSuspendedTransaction(context = dispatcherProvider.io, db = database) {
            val purchase = PurchasesDao.findById(idPurchase.id) ?: return@newSuspendedTransaction null
            purchase.userId = EntityID(idPurchase.userId, Users)
            purchase.vaccineId = EntityID(idPurchase.vaccineId, Vaccines)
            purchase.amount = idPurchase.amount
            purchase.totalSpent = idPurchase.totalSpent
            purchase.status = idPurchase.status.name
            if (idPurchase.timestamp != null)
                purchase.timestamp = idPurchase.timestamp
            purchase.toPurchase()
        }

    override suspend fun getForUser(userId: Int): List<IdPurchase> =
        newSuspendedTransaction(context = dispatcherProvider.io, db = database) {
            PurchasesDao.find(op = Purchases.userId eq userId).map { it.toPurchase() }
        }

    override suspend fun getById(id: Int): IdPurchase? =
        newSuspendedTransaction(context = dispatcherProvider.io, db = database) {
            PurchasesDao.findById(id)?.toPurchase()
        }
}