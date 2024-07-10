package com.github.dannful.data.dao

import com.github.dannful.data.entity.Users
import com.github.dannful.domain.model.User
import org.jetbrains.exposed.dao.IntEntity
import org.jetbrains.exposed.dao.IntEntityClass
import org.jetbrains.exposed.dao.id.EntityID

class UsersDao(id: EntityID<Int>) : IntEntity(id) {

    companion object : IntEntityClass<UsersDao>(Users)

    var email by Users.email
    var name by Users.name
    var password by Users.password
    var role by Users.role
    var state by Users.state
    var city by Users.city

    fun toUser(): User = User(
        email = email,
        name = name,
        password = password,
        role = role,
        state = state,
        city = city
    )
}