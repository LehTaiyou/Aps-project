package com.aps.aps_project.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.aps.aps_project.model.Professor;

public interface ProfessorRepository extends MongoRepository<Professor, String>{
    
}
