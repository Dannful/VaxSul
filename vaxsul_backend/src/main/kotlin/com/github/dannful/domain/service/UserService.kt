package com.github.dannful.domain.service

import com.github.dannful.domain.model.User

interface UserService {

    suspend fun addUser(user: User)
    suspend fun deleteUser(id: Int)
    suspend fun getUserById(id: Int): User?
    suspend fun getUserByEmail(email: String): User?
    suspend fun getUsers(): List<User>
}