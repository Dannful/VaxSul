package com.github.dannful.data.dao

import com.github.dannful.data.entity.Users
import com.github.dannful.domain.model.IdUser
import com.github.dannful.domain.model.Role
import org.jetbrains.exposed.dao.IntEntity
import org.jetbrains.exposed.dao.IntEntityClass
import org.jetbrains.exposed.dao.id.EntityID

class UsersDao(id: EntityID<Int>) : IntEntity(id) {

    companion object : IntEntityClass<UsersDao>(Users)

    var email by Users.email
    var name by Users.name
    var password by Users.password
    var role by Users.role
    var cpf by Users.cpf
    var phone by Users.phone
    var birthday by Users.birthday
    var laboratoryId by Users.laboratoryId

    fun toUser() = IdUser(
        id = id.value,
        email = email,
        name = name,
        password = password,
        role = Role.valueOf(role),
        cpf = cpf,
        phone = phone,
        birthday = birthday,
        laboratoryId = laboratoryId?.value
    )
}