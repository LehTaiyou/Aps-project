package com.aps.aps_project.model;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document(collection="alunos")
public class Aluno {
    
    @Id
    private String matricula;
    private String nome;
    private float horasCumpridas;
    private List<String> eventosPresente;

    public Aluno() {
    }

    public Aluno(String matricula, String nome) {
        this.matricula = matricula;
        this.nome = nome;
        this.horasCumpridas = 0;
        this.eventosPresente = new ArrayList<String>();
    }
}
