package com.aps.aps_project.model;

import java.util.Date;
import java.util.ArrayList;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document(collection="eventos")
public class Evento {
    
    @Id
    private String id;
    private String titulo;
    private String descricao;
    private String local;
    private Date data;
    private float cargaHoraria;
    private int maxParticipantes;
    private List<String> alunosInscritos;
    private String professorResponsavel;

    public Evento() {
    }

    public Evento(String titulo, String descricao, String local, Date data, float cargaHoraria, int maxParticipantes, String professorResponsavel) {
        this.titulo = titulo;
        this.descricao = descricao;
        this.local = local;
        this.data = data;
        this.cargaHoraria = cargaHoraria;
        this.maxParticipantes = maxParticipantes;
        this.alunosInscritos = new ArrayList<String>();
        this.professorResponsavel = professorResponsavel;
    }
}
