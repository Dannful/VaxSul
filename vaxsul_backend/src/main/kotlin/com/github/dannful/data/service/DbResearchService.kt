package com.github.dannful.data.service

import com.github.dannful.data.dao.ResearchesDao
import com.github.dannful.domain.model.Research
import com.github.dannful.domain.service.DispatcherProvider
import com.github.dannful.domain.service.ResearchService
import org.jetbrains.exposed.sql.Database
import org.jetbrains.exposed.sql.transactions.experimental.newSuspendedTransaction

class DbResearchService(
    private val dispatcherProvider: DispatcherProvider,
    private val database: Database
) : ResearchService {

    override suspend fun getResearches(): List<Research> =
        newSuspendedTransaction(context = dispatcherProvider.io, db = database) {
            ResearchesDao.all().map { it.toResearch() }
        }

    override suspend fun getResearch(id: Int): Research? =
        newSuspendedTransaction(context = dispatcherProvider.io, db = database) {
            ResearchesDao.findById(id)?.toResearch()
        }

    override suspend fun addResearch(research: Research): Research =
        newSuspendedTransaction(context = dispatcherProvider.io, db = database) {
            if(research.id != null) {
                val foundResearch = ResearchesDao.findById(research.id) ?: return@newSuspendedTransaction research
                foundResearch.status = research.status
                foundResearch.startDate = research.startDate
                foundResearch.progress = research.progress
                return@newSuspendedTransaction foundResearch.toResearch()
            }
            ResearchesDao.new {
                startDate = research.startDate
                status = research.status
                progress = research.progress
            }.toResearch()
    }

    override suspend fun deleteResearch(id: Int) {
        newSuspendedTransaction(context = dispatcherProvider.io, db = database) {
            ResearchesDao.findById(id)?.delete()
        }
    }
}