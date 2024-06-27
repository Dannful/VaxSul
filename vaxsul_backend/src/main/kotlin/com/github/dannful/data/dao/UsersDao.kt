package com.github.dannful.data.dao

import com.github.dannful.data.entity.Users
import com.github.dannful.domain.model.User
import org.jetbrains.exposed.dao.IntEntity
import org.jetbrains.exposed.dao.IntEntityClass
import org.jetbrains.exposed.dao.id.EntityID

class UsersDao(id: EntityID<Int>) : IntEntity(id) {

    companion object : IntEntityClass<UsersDao>(Users)

    var email by Users.email
    var username by Users.username
    var password by Users.password
    var role by Users.role

    fun toUser(): User = User(
        email = email,
        username = username,
        password = password,
        role = role
    )
}