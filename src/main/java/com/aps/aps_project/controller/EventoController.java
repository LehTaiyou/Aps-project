package com.aps.aps_project.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.aps.aps_project.model.Evento;
import com.aps.aps_project.repository.EventoRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping(path="/eventos")
public class EventoController {
    
    @Autowired
    private EventoRepository eventoRepository;

    @GetMapping
    public List<Evento> buscarEventos() {
        return eventoRepository.findAll();
    }

    @GetMapping("/{id}")
    public Evento buscarEventoPorId(@PathVariable String id) {
        return eventoRepository.findById(id).orElse(null);
    }
    
    @PostMapping
    public Evento criarEvento(@RequestBody Evento evento) {        
        return eventoRepository.save(evento);
    }
    
    
}
