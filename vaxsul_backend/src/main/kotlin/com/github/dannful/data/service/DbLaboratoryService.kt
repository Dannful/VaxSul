package com.github.dannful.data.service

import com.github.dannful.data.dao.LaboratoriesDao
import com.github.dannful.domain.model.Laboratory
import com.github.dannful.domain.service.DispatcherProvider
import com.github.dannful.domain.service.LaboratoryService
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.transactions.experimental.newSuspendedTransaction

class DbLaboratoryService(
    private val database: Database,
    private val dispatcherProvider: DispatcherProvider
) : LaboratoryService {

    override suspend fun addLaboratory(laboratory: Laboratory) {
        newSuspendedTransaction(context = dispatcherProvider.io, db = database) {
            if (laboratory.id != null) {
                val foundLaboratory = LaboratoriesDao.findById(laboratory.id) ?: return@newSuspendedTransaction
                foundLaboratory.description = laboratory.description
                foundLaboratory.cnpj = laboratory.cnpj
                foundLaboratory.name = laboratory.name
                return@newSuspendedTransaction
            }
            LaboratoriesDao.new {
                name = laboratory.name
                cnpj = laboratory.cnpj
                description = laboratory.description
            }
        }
    }

    override suspend fun getLaboratories(): List<Laboratory> =
        newSuspendedTransaction(context = dispatcherProvider.io, db = database) {
            LaboratoriesDao.all().map { it.toLaboratory() }
        }

    override suspend fun getLaboratory(id: Int): Laboratory? =
        newSuspendedTransaction(context = dispatcherProvider.io, db = database) {
            LaboratoriesDao.findById(id)?.toLaboratory()
        }

    override suspend fun deleteLaboratory(id: Int) {
        newSuspendedTransaction(context = dispatcherProvider.io, db = database) {
            LaboratoriesDao.findById(id)?.delete()
        }
    }
}