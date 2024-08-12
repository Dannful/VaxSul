package com.github.dannful.data.service

import com.github.dannful.data.dao.VaccinesDao
import com.github.dannful.data.entity.Researches
import com.github.dannful.data.entity.Vaccines
import com.github.dannful.domain.model.*
import com.github.dannful.domain.service.DispatcherProvider
import com.github.dannful.domain.service.VaccineService
import org.jetbrains.exposed.dao.id.EntityID
import org.jetbrains.exposed.sql.Database
import org.jetbrains.exposed.sql.and
import org.jetbrains.exposed.sql.transactions.experimental.newSuspendedTransaction

class DbVaccineService(
    private val database: Database,
    private val dispatcherProvider: DispatcherProvider
) : VaccineService {

    override suspend fun getVaccines(): List<IdVaccine> =
        newSuspendedTransaction(context = dispatcherProvider.io, db = database) {
            VaccinesDao.all().map { it.toVaccine() }
        }

    override suspend fun getVaccineById(id: Int): IdVaccine? =
        newSuspendedTransaction(context = dispatcherProvider.io, db = database) {
            VaccinesDao.findById(id)?.toVaccine()
        }

    override suspend fun deleteVaccine(id: Int) =
        newSuspendedTransaction(context = dispatcherProvider.io, db = database) {
            val vaccine = VaccinesDao.findById(id) ?: return@newSuspendedTransaction null
            vaccine.delete()
            vaccine.toVaccine()
        }

    override suspend fun addVaccine(vaccine: Vaccine): IdVaccine =
        newSuspendedTransaction(context = dispatcherProvider.io, db = database) {
            VaccinesDao.new {
                pricePerUnit = vaccine.pricePerUnit
                amountInStock = vaccine.amountInStock
                researchId =
                    EntityID(id = vaccine.researchId, table = Researches)
                dose = vaccine.dose
                name = vaccine.name
                description = vaccine.description
            }.toVaccine()
        }

    override suspend fun search(vaccineQuery: VaccineQuery): VaccineSearchResult =
        newSuspendedTransaction(context = dispatcherProvider.io, db = database) {
            val orderBy = VaccinesDao.find {
                (Vaccines.amountInStock greaterEq (vaccineQuery.amountInStock
                    ?: 0) and (Vaccines.name like "%${vaccineQuery.name.orEmpty()}%").and(
                    Vaccines.pricePerUnit lessEq (vaccineQuery.maximumPrice ?: Float.POSITIVE_INFINITY)
                ).and(
                    Vaccines.pricePerUnit greaterEq (vaccineQuery.minimumPrice ?: 0f)
                ))
            }
            VaccineSearchResult(orderBy.count(), orderBy.limit(vaccineQuery.count ?: Int.MAX_VALUE)
                .toList()
                .map { it.toVaccine() })
        }

    override suspend fun updateVaccine(idVaccine: IdVaccine): IdVaccine? =
        newSuspendedTransaction(context = dispatcherProvider.io, db = database) {
            val vaccine = VaccinesDao.findById(idVaccine.id) ?: return@newSuspendedTransaction null
            vaccine.pricePerUnit = idVaccine.pricePerUnit
            vaccine.amountInStock = idVaccine.amountInStock
            vaccine.researchId =
                EntityID(id = idVaccine.researchId, table = Researches)
            vaccine.dose = idVaccine.dose
            vaccine.name = idVaccine.name
            vaccine.description = idVaccine.description
            vaccine.toVaccine()
        }
}