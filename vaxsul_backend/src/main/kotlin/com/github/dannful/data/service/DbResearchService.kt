package com.github.dannful.data.service

import com.github.dannful.data.dao.ResearchesDao
import com.github.dannful.data.entity.Laboratories
import com.github.dannful.domain.model.IdResearch
import com.github.dannful.domain.model.Research
import com.github.dannful.domain.service.DispatcherProvider
import com.github.dannful.domain.service.ResearchService
import org.jetbrains.exposed.dao.id.EntityID
import org.jetbrains.exposed.sql.Database
import org.jetbrains.exposed.sql.transactions.experimental.newSuspendedTransaction

class DbResearchService(
    private val dispatcherProvider: DispatcherProvider,
    private val database: Database
) : ResearchService {

    override suspend fun getResearches(): List<IdResearch> =
        newSuspendedTransaction(context = dispatcherProvider.io, db = database) {
            ResearchesDao.all().map { it.toResearch() }
        }

    override suspend fun getResearch(id: Int): IdResearch? =
        newSuspendedTransaction(context = dispatcherProvider.io, db = database) {
            ResearchesDao.findById(id)?.toResearch()
        }

    override suspend fun addResearch(research: Research): IdResearch =
        newSuspendedTransaction(context = dispatcherProvider.io, db = database) {
            ResearchesDao.new {
                startDate = research.startDate
                status = research.status
                progress = research.progress
                name = research.name
                description = research.description
                report = research.report
                laboratoryId = EntityID(research.laboratoryId, Laboratories)
            }.toResearch()
        }

    override suspend fun deleteResearch(id: Int) {
        newSuspendedTransaction(context = dispatcherProvider.io, db = database) {
            ResearchesDao.findById(id)?.delete()
        }
    }

    override suspend fun updateResearch(idResearch: IdResearch): IdResearch? =
        newSuspendedTransaction(context = dispatcherProvider.io, db = database) {
            val research = ResearchesDao.findById(idResearch.id) ?: return@newSuspendedTransaction null
            research.startDate = idResearch.startDate
            research.status = idResearch.status
            research.progress = idResearch.progress
            research.name = idResearch.name
            research.description = idResearch.description
            research.report = idResearch.report
            research.laboratoryId = EntityID(idResearch.laboratoryId, Laboratories)
            research.toResearch()
        }
}