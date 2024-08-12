package com.github.dannful.plugins

import com.apurebase.kgraphql.Context
import com.apurebase.kgraphql.GraphQL
import com.auth0.jwt.JWT
import com.auth0.jwt.algorithms.Algorithm
import com.github.dannful.domain.model.*
import com.github.dannful.domain.service.*
import com.github.dannful.util.Constants
import io.ktor.server.application.*
import io.ktor.server.sessions.*
import kotlinx.datetime.LocalDate
import kotlinx.datetime.LocalDateTime
import org.koin.ktor.ext.inject

fun Application.configureGraphQL() {
    val jwtData: JWTData by inject()
    val vaccineService: VaccineService by inject()
    val purchaseService: PurchaseService by inject()
    val researchService: ResearchService by inject()
    val laboratoryService: LaboratoryService by inject()
    val userService: UserService by inject()
    install(GraphQL) {
        playground = true
        context { call ->
            val session = call.sessions.get<UserSession>() ?: return@context
            try {
                val token = JWT.require(Algorithm.HMAC256(jwtData.secret)).withIssuer(jwtData.issuer)
                    .withAudience(jwtData.audience)
                    .build().verify(session.token)
                +Role.valueOf(token.getClaim(Constants.JWT_CLAIM_ROLE_FIELD_NAME).asString())
            } catch (e: Exception) {
                return@context
            }
        }
        schema {
            stringScalar<LocalDateTime> {
                serialize = { date: LocalDateTime -> date.toString() }
                deserialize = { date: String ->
                    LocalDateTime.parse(date)
                }
            }
            stringScalar<LocalDate> {
                serialize = { date: LocalDate -> date.toString() }
                deserialize = { date: String ->
                    LocalDate.parse(date)
                }
            }
            enum<ResearchStatus> {
                description = "Research status"
            }
            enum<PurchaseStatus> {
                description = "Purchase status"
            }
            enum<Role> {
                description = "User's role"
            }
            type<IdVaccine> {
                IdVaccine::researchId.ignore()
                property("research") {
                    resolver { vaccine ->
                        researchService.getResearch(vaccine.researchId)!!
                    }
                }
            }
            type<IdResearch> {
                IdResearch::laboratoryId.ignore()
                property("laboratory") {
                    resolver { research ->
                        laboratoryService.getLaboratory(research.laboratoryId)!!
                    }
                }
            }
            type<IdPurchase> {
                IdPurchase::userId.ignore()
                IdPurchase::vaccineId.ignore()
                property("user") {
                    resolver { purchase ->
                        userService.getUserById(purchase.userId)
                    }
                }
                property("vaccine") {
                    resolver { purchase ->
                        vaccineService.getVaccineById(purchase.vaccineId)
                    }
                }
            }
            query("vaccines") {
                resolver { ->
                    vaccineService.getVaccines()
                }
            }
            query("vaccine") {
                resolver { id: Int ->
                    vaccineService.getVaccineById(id)
                }
            }
            query("researches") {
                resolver { context: Context ->
                    val role = context.get<Role>() ?: throw UnauthorizedException(Role.RESEARCHER)
                    if (role !in Role.RESEARCHER.getParentRoles().plus(Role.RESEARCH_LEAD))
                        throw UnauthorizedException(Role.RESEARCHER)
                    researchService.getResearches()
                }
            }
            query("research") {
                resolver { id: Int, context: Context ->
                    val role = context.get<Role>() ?: throw UnauthorizedException(Role.RESEARCHER)
                    if (role !in Role.RESEARCHER.getParentRoles())
                        throw UnauthorizedException(Role.RESEARCHER)
                    researchService.getResearch(id)
                }
            }
            query("laboratories") {
                resolver { ->
                    laboratoryService.getLaboratories()
                }
            }
            query("laboratory") {
                resolver { id: Int ->
                    laboratoryService.getLaboratory(id)
                }
            }
            query("searchVaccine") {
                resolver { vaccineQuery: VaccineQuery ->
                    vaccineService.search(vaccineQuery)
                }
            }
            query("purchases") {
                resolver { userId: Int ->
                    purchaseService.getForUser(userId)
                }
            }
            query("purchase") {
                resolver { id: Int ->
                    purchaseService.getById(id)
                }
            }
            query("userPurchase") {
                resolver { userId: Int ->
                    purchaseService.getForUser(userId)
                }
            }
            mutation("newPurchase") {
                resolver { purchase: Purchase ->
                    purchaseService.add(purchase)
                }
            }
            mutation("newLaboratory") {
                resolver { laboratory: Laboratory ->
                    laboratoryService.addLaboratory(laboratory)
                }
            }
            mutation("newVaccine") {
                resolver { context: Context, vaccine: Vaccine ->
                    val role = context.get<Role>() ?: throw UnauthorizedException(Role.RESEARCH_LEAD)
                    if (role !in Role.RESEARCH_LEAD.getParentRoles())
                        throw UnauthorizedException(Role.RESEARCH_LEAD)
                    vaccineService.addVaccine(vaccine)
                }
            }
            mutation("newResearch") {
                resolver { context: Context, research: Research ->
                    val role = context.get<Role>() ?: throw UnauthorizedException(Role.RESEARCHER)
                    if (role !in Role.RESEARCHER.getParentRoles())
                        throw UnauthorizedException(Role.RESEARCHER)
                    researchService.addResearch(research)
                }
            }
            mutation("newUser") {
                resolver { user: User ->
                    userService.addUser(user)
                }
            }
            mutation("updateLaboratory") {
                resolver { id: Int, laboratory: Laboratory ->
                    laboratoryService.updateLaboratory(
                        IdLaboratory(
                            id = id,
                            name = laboratory.name,
                            description = laboratory.description,
                            cnpj = laboratory.cnpj
                        )
                    )
                }
            }
            mutation("updatePurchase") {
                resolver { id: Int, purchase: Purchase ->
                    purchaseService.updatePurchase(
                        IdPurchase(
                            id = id,
                            userId = purchase.userId,
                            vaccineId = purchase.vaccineId,
                            totalSpent = purchase.totalSpent,
                            amount = purchase.amount,
                            timestamp = purchase.timestamp,
                            status = purchase.status
                        )
                    )
                }
            }
            mutation("updateResearch") {
                resolver { context: Context, id: Int, research: Research ->
                    val role = context.get<Role>() ?: throw UnauthorizedException(Role.RESEARCHER)
                    if (role !in Role.RESEARCHER.getParentRoles())
                        throw UnauthorizedException(Role.RESEARCHER)
                    researchService.updateResearch(
                        IdResearch(
                            id = id,
                            laboratoryId = research.laboratoryId,
                            startDate = research.startDate,
                            status = research.status,
                            progress = research.progress,
                            name = research.name,
                            description = research.description,
                            report = research.report
                        )
                    )
                }
            }
            mutation("updateUser") {
                resolver { id: Int, user: User ->
                    userService.updateUser(
                        IdUser(
                            id = id,
                            email = user.email,
                            name = user.name,
                            password = user.password,
                            role = user.role,
                            cpf = user.cpf,
                            phone = user.phone,
                            birthday = user.birthday,
                            laboratoryId = user.laboratoryId
                        )
                    )
                }
            }
            mutation("updateVaccine") {
                resolver { id: Int, vaccine: Vaccine ->
                    vaccineService.updateVaccine(
                        IdVaccine(
                            id = id,
                            pricePerUnit = vaccine.pricePerUnit,
                            amountInStock = vaccine.amountInStock,
                            researchId = vaccine.researchId,
                            dose = vaccine.dose,
                            description = vaccine.description,
                            name = vaccine.name
                        )
                    )
                }
            }
            mutation("deleteVaccine") {
                resolver { context: Context, id: Int ->
                    val role = context.get<Role>() ?: throw UnauthorizedException(Role.SALES_MANAGER)
                    if (role !in Role.SALES_MANAGER.getParentRoles())
                        throw UnauthorizedException(Role.SALES_MANAGER)
                    vaccineService.deleteVaccine(id)
                }
            }
        }
    }
}

private class UnauthorizedException(
    role: Role
) : Exception("Unauthorized: this requires the role of $role")