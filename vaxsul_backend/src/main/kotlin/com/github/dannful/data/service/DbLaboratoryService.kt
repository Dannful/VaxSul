package com.github.dannful.data.service

import com.github.dannful.data.dao.LaboratoriesDao
import com.github.dannful.domain.model.IdLaboratory
import com.github.dannful.domain.model.Laboratory
import com.github.dannful.domain.service.DispatcherProvider
import com.github.dannful.domain.service.LaboratoryService
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.transactions.experimental.newSuspendedTransaction

class DbLaboratoryService(
    private val database: Database,
    private val dispatcherProvider: DispatcherProvider
) : LaboratoryService {

    override suspend fun addLaboratory(laboratory: Laboratory): IdLaboratory =
        newSuspendedTransaction(context = dispatcherProvider.io, db = database) {
            LaboratoriesDao.new {
                name = laboratory.name
                cnpj = laboratory.cnpj
                description = laboratory.description
            }.toLaboratory()
        }

    override suspend fun getLaboratories(): List<IdLaboratory> =
        newSuspendedTransaction(context = dispatcherProvider.io, db = database) {
            LaboratoriesDao.all().map { it.toLaboratory() }
        }

    override suspend fun getLaboratory(id: Int): IdLaboratory? =
        newSuspendedTransaction(context = dispatcherProvider.io, db = database) {
            LaboratoriesDao.findById(id)?.toLaboratory()
        }

    override suspend fun deleteLaboratory(id: Int) {
        newSuspendedTransaction(context = dispatcherProvider.io, db = database) {
            LaboratoriesDao.findById(id)?.delete()
        }
    }

    override suspend fun updateLaboratory(idLaboratory: IdLaboratory): IdLaboratory? =
        newSuspendedTransaction(context = dispatcherProvider.io, db = database) {
            val lab = LaboratoriesDao.findById(idLaboratory.id) ?: return@newSuspendedTransaction null
            lab.name = idLaboratory.name
            lab.cnpj = idLaboratory.cnpj
            lab.description = idLaboratory.description
            lab.toLaboratory()
        }
}