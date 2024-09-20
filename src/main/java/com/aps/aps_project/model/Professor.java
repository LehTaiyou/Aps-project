package com.aps.aps_project.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document(collection="professores")
public class Professor {
    
    @Id
    private String matricula;
    private String nome;

    public Professor() {
    }

    public Professor(String matricula, String nome) {
        this.matricula = matricula;
        this.nome = nome;
    }
}
