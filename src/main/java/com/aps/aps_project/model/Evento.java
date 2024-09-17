package com.aps.aps_project.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document(collection="eventos")
public class Evento {
    
    @Id
    private String id;
    private String titulo;
    private String curso;
    private int numHoras;

    public Evento() {
    }

    public Evento(String titulo, String curso, int numHoras) {
        this.titulo = titulo;
        this.curso = curso;
        this.numHoras = numHoras;
    }
}
