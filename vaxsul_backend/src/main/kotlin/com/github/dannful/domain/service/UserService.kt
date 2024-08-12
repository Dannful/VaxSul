package com.github.dannful.domain.service

import com.github.dannful.domain.model.IdUser
import com.github.dannful.domain.model.User

interface UserService {

    suspend fun addUser(user: User): IdUser
    suspend fun deleteUser(id: Int)
    suspend fun getUserById(id: Int): IdUser?
    suspend fun getUserByEmail(email: String): IdUser?
    suspend fun getUsers(): List<IdUser>
    suspend fun updateUser(idUser: IdUser): IdUser?
}