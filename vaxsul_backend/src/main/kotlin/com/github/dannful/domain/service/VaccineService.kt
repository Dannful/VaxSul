package com.github.dannful.domain.service

import com.github.dannful.domain.model.Vaccine

interface VaccineService {

    suspend fun getVaccines(): List<Vaccine>
    suspend fun getVaccineById(id: Int): Vaccine?
    suspend fun deleteVaccine(id: Int)
    suspend fun addVaccine(vaccine: Vaccine)
}