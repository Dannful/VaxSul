package com.github.dannful.domain.service

import com.github.dannful.data.dao.VaccinesDao
import com.github.dannful.domain.model.*

interface VaccineService {

    suspend fun getVaccines(): List<IdVaccine>
    suspend fun getVaccineById(id: Int): IdVaccine?
    suspend fun deleteVaccine(id: Int): IdVaccine?
    suspend fun addVaccine(vaccine: Vaccine): IdVaccine
    suspend fun search(vaccineQuery: VaccineQuery): VaccineSearchResult
    suspend fun updateVaccine(idVaccine: IdVaccine): IdVaccine?
}