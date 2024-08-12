package com.github.dannful.domain.service

import com.github.dannful.domain.model.IdPurchase
import com.github.dannful.domain.model.Purchase

interface PurchaseService {

    suspend fun add(purchase: Purchase): IdPurchase
    suspend fun getForUser(userId: Int): List<IdPurchase>
    suspend fun getById(id: Int): IdPurchase?
    suspend fun updatePurchase(idPurchase: IdPurchase): IdPurchase?
    suspend fun getAll(): List<IdPurchase>
}