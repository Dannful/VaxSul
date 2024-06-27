package com.github.dannful.data.service

import com.github.dannful.data.dao.ResearchesDao
import com.github.dannful.data.dao.UsersDao
import com.github.dannful.data.entity.Users
import com.github.dannful.domain.model.Research
import com.github.dannful.domain.model.User
import com.github.dannful.domain.service.DispatcherProvider
import com.github.dannful.domain.service.ResearchService
import com.github.dannful.domain.service.UserService
import org.jetbrains.exposed.sql.Database
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq
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

    override suspend fun addResearch(research: Research) {
        newSuspendedTransaction(context = dispatcherProvider.io, db = database) {
            ResearchesDao.new {
                startDate = research.startDate
                status = research.status
            }
        }
    }

    override suspend fun deleteResearch(id: Int) {
        newSuspendedTransaction(context = dispatcherProvider.io, db = database) {
            ResearchesDao.findById(id)?.delete()
        }
    }
}