package com.github.dannful.data.service

import com.github.dannful.data.dao.UsersDao
import com.github.dannful.data.entity.Laboratories
import com.github.dannful.data.entity.Users
import com.github.dannful.domain.model.IdUser
import com.github.dannful.domain.model.User
import com.github.dannful.domain.service.DispatcherProvider
import com.github.dannful.domain.service.UserService
import org.jetbrains.exposed.dao.id.EntityID
import org.jetbrains.exposed.sql.Database
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq
import org.jetbrains.exposed.sql.transactions.experimental.newSuspendedTransaction

class DbUserService(
    private val dispatcherProvider: DispatcherProvider,
    private val database: Database
) : UserService {

    override suspend fun getUserByEmail(email: String): IdUser? =
        newSuspendedTransaction(context = dispatcherProvider.io, db = database) {
            UsersDao.find(Users.email eq email).firstOrNull()?.toUser()
        }

    override suspend fun addUser(user: User): IdUser =
        newSuspendedTransaction(context = dispatcherProvider.io, db = database) {
            UsersDao.new {
                email = user.email
                name = user.name
                password = user.password
                role = user.role
                cpf = user.cpf
                phone = user.phone
                birthday = user.birthday
                if (user.laboratoryId != null)
                    laboratoryId = EntityID(id = user.laboratoryId, table = Laboratories)
            }.toUser()
        }

    override suspend fun deleteUser(id: Int) {
        newSuspendedTransaction(context = dispatcherProvider.io, db = database) {
            UsersDao.findById(id)?.delete()
        }
    }

    override suspend fun getUserById(id: Int): IdUser? =
        newSuspendedTransaction(context = dispatcherProvider.io, db = database) {
            UsersDao.findById(id)?.toUser()
        }

    override suspend fun getUsers(): List<IdUser> =
        newSuspendedTransaction(context = dispatcherProvider.io, db = database) {
            UsersDao.all().map {
                it.toUser()
            }
        }

    override suspend fun updateUser(idUser: IdUser): IdUser? =
        newSuspendedTransaction(context = dispatcherProvider.io, db = database) {
            val user = UsersDao.findById(idUser.id) ?: return@newSuspendedTransaction null
            user.email = idUser.email
            user.name = idUser.name
            user.password = idUser.password
            user.role = idUser.role
            user.cpf = idUser.cpf
            user.phone = idUser.phone
            user.birthday = idUser.birthday
            if (idUser.laboratoryId != null)
                user.laboratoryId = EntityID(id = idUser.laboratoryId, table = Laboratories)
            user.toUser()
        }
}