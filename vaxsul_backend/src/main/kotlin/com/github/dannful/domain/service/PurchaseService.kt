package com.github.dannful.domain.service

import com.github.dannful.domain.model.Purchase

interface PurchaseService {

    suspend fun add(purchase: Purchase)
    suspend fun getForUser(userId: Int): List<Purchase>
    suspend fun getById(id: Int): Purchase?
}