package com.github.dannful.domain.service

import com.github.dannful.domain.model.IdResearch
import com.github.dannful.domain.model.Research

interface ResearchService {

    suspend fun getResearches(): List<IdResearch>
    suspend fun getResearch(id: Int): IdResearch?
    suspend fun addResearch(research: Research): IdResearch
    suspend fun deleteResearch(id: Int)
    suspend fun updateResearch(idResearch: IdResearch): IdResearch?
}