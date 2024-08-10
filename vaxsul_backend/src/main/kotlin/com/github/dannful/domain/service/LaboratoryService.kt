package com.github.dannful.domain.service

import com.github.dannful.domain.model.Laboratory

interface LaboratoryService {

    suspend fun addLaboratory(laboratory: Laboratory)
    suspend fun getLaboratories(): List<Laboratory>
    suspend fun getLaboratory(id: Int): Laboratory?
    suspend fun deleteLaboratory(id: Int)
}