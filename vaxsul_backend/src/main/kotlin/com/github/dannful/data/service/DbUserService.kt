package com.github.dannful.data.service

import com.github.dannful.data.dao.UsersDao
import com.github.dannful.data.entity.Users
import com.github.dannful.domain.model.User
import com.github.dannful.domain.service.DispatcherProvider
import com.github.dannful.domain.service.UserService
import org.jetbrains.exposed.sql.Database
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq
import org.jetbrains.exposed.sql.transactions.experimental.newSuspendedTransaction

class DbUserService(
    private val dispatcherProvider: DispatcherProvider,
    private val database: Database
) : UserService {

    override suspend fun getUserByEmail(email: String): User? =
        newSuspendedTransaction(context = dispatcherProvider.io, db = database) {
            UsersDao.find(Users.email eq email).firstOrNull()?.toUser()
        }

    override suspend fun addUser(user: User) {
        newSuspendedTransaction(context = dispatcherProvider.io, db = database) {
            if (user.id != null) {
                val foundUser = UsersDao.findById(user.id) ?: return@newSuspendedTransaction
                foundUser.email = user.email
                foundUser.role = user.role
                foundUser.city = user.city
                foundUser.name = user.name
                foundUser.password = user.password
                foundUser.state = user.state
                return@newSuspendedTransaction
            }
            UsersDao.new {
                email = user.email
                name = user.name
                password = user.password
                role = user.role
                state = user.state
                city = user.city
            }
        }
    }

    override suspend fun deleteUser(id: Int) {
        newSuspendedTransaction(context = dispatcherProvider.io, db = database) {
            UsersDao.findById(id)?.delete()
        }
    }

    override suspend fun getUserById(id: Int): User? =
        newSuspendedTransaction(context = dispatcherProvider.io, db = database) {
            UsersDao.findById(id)?.toUser()
        }

    override suspend fun getUsers(): List<User> =
        newSuspendedTransaction(context = dispatcherProvider.io, db = database) {
            UsersDao.all().map {
                it.toUser()
            }
        }
}