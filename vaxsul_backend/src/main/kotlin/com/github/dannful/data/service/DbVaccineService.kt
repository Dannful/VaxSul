package com.github.dannful.data.service

import com.github.dannful.data.dao.VaccinesDao
import com.github.dannful.data.entity.Laboratories
import com.github.dannful.data.entity.Researches
import com.github.dannful.data.entity.Vaccines
import com.github.dannful.domain.model.Vaccine
import com.github.dannful.domain.model.VaccineQuery
import com.github.dannful.domain.service.DispatcherProvider
import com.github.dannful.domain.service.VaccineService
import org.jetbrains.exposed.dao.id.EntityID
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.transactions.experimental.newSuspendedTransaction

class DbVaccineService(
    private val database: Database,
    private val dispatcherProvider: DispatcherProvider
) : VaccineService {

    override suspend fun getVaccines(): List<Vaccine> =
        newSuspendedTransaction(context = dispatcherProvider.io, db = database) {
            VaccinesDao.all().map { it.toVaccine() }
        }

    override suspend fun getVaccineById(id: Int): Vaccine? =
        newSuspendedTransaction(context = dispatcherProvider.io, db = database) {
            VaccinesDao.findById(id)?.toVaccine()
        }

    override suspend fun deleteVaccine(id: Int) {
        newSuspendedTransaction(context = dispatcherProvider.io, db = database) {
            VaccinesDao.findById(id)?.delete()
        }
    }

    override suspend fun addVaccine(vaccine: Vaccine) {
        newSuspendedTransaction(context = dispatcherProvider.io, db = database) {
            if (vaccine.id != null) {
                val foundVaccine = VaccinesDao.findById(vaccine.id) ?: return@newSuspendedTransaction
                foundVaccine.name = vaccine.name
                foundVaccine.dose = vaccine.dose
                foundVaccine.amountInStock = vaccine.amountInStock
                foundVaccine.description = vaccine.description
                if (vaccine.researchId != null)
                    foundVaccine.researchId = EntityID(id = vaccine.researchId, table = Researches)
                foundVaccine.pricePerUnit = vaccine.pricePerUnit
                foundVaccine.sellable = vaccine.sellable
                foundVaccine.laboratoryId = EntityID(id = vaccine.laboratoryId, table = Laboratories)

                return@newSuspendedTransaction
            }
            VaccinesDao.new {
                pricePerUnit = vaccine.pricePerUnit
                amountInStock = vaccine.amountInStock
                researchId =
                    if (vaccine.researchId != null) EntityID(id = vaccine.researchId, table = Researches) else null
                sellable = vaccine.sellable
                dose = vaccine.dose
                name = vaccine.name
                description = vaccine.description
                laboratoryId = EntityID(id = vaccine.laboratoryId, table = Laboratories)
            }
        }
    }

    override suspend fun search(vaccineQuery: VaccineQuery): List<Vaccine> =
        newSuspendedTransaction(context = dispatcherProvider.io, db = database) {
            VaccinesDao.find {
                (Vaccines.name like "%${vaccineQuery.name.orEmpty()}%").and(
                    if (vaccineQuery.maximumPrice != null) Vaccines.pricePerUnit lessEq vaccineQuery.maximumPrice else booleanParam(
                        true
                    )
                ).and(
                    Vaccines.pricePerUnit greaterEq (vaccineQuery.minimumPrice ?: 0f)
                )
            }.orderBy().toList().map { it.toVaccine() }
        }
}