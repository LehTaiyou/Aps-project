package com.aps.aps_project.model;

import java.util.Date;

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

    public Evento() {
    }

    public Evento(String id, String titulo, String descricao, String local, Date data, float cargaHoraria, int maxParticipantes) {
        this.id = id;
        this.titulo = titulo;
        this.descricao = descricao;
        this.local = local;
        this.data = data;
        this.cargaHoraria = cargaHoraria;
        this.maxParticipantes = maxParticipantes;
    }
}
