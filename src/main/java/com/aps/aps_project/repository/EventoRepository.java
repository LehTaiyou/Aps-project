package com.aps.aps_project.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.aps.aps_project.model.Evento;

public interface EventoRepository extends MongoRepository<Evento, String>{
    
}
