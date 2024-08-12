package com.github.dannful.domain.service

import com.github.dannful.domain.model.IdLaboratory
import com.github.dannful.domain.model.Laboratory

interface LaboratoryService {

    suspend fun addLaboratory(laboratory: Laboratory): IdLaboratory
    suspend fun getLaboratories(): List<IdLaboratory>
    suspend fun getLaboratory(id: Int): IdLaboratory?
    suspend fun deleteLaboratory(id: Int)
    suspend fun updateLaboratory(idLaboratory: IdLaboratory): IdLaboratory?
}