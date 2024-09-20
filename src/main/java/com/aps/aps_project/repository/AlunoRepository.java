package com.aps.aps_project.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.aps.aps_project.model.Aluno;

public interface AlunoRepository extends MongoRepository<Aluno, String>{
    
}
