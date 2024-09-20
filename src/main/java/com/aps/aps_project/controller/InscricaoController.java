package com.aps.aps_project.controller;

import java.util.ArrayList;

import com.aps.aps_project.model.Evento;
import com.aps.aps_project.model.ParticipacaoRequest;
import com.aps.aps_project.repository.EventoRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping(path = "/inscricoes")
public class InscricaoController {

    @Autowired
    private EventoRepository eventoRepository;

    @PostMapping
    public String inscreverAluno(@RequestBody ParticipacaoRequest inscricaoRequest) {
        String alunoMatricula = inscricaoRequest.getAlunoMatricula();
        String eventoId = inscricaoRequest.getEventoId();

        // Busca o evento pelo ID
        Optional<Evento> optionalEvento = eventoRepository.findById(eventoId);
        if (!optionalEvento.isPresent()) {
            return "Evento não encontrado.";
        }
        Evento evento = optionalEvento.get();

        // Verifica se a lista de alunos inscritos está nula e inicializa se necessário
        if (evento.getAlunosInscritos() == null) {
            evento.setAlunosInscritos(new ArrayList<String>());
        }

        // Verifica se o aluno já está inscrito no evento
        if (evento.getAlunosInscritos().contains(alunoMatricula)) {
            return "Aluno já inscrito no evento.";
        }

        // Adiciona a matrícula do aluno à lista de inscritos do evento
        evento.getAlunosInscritos().add(alunoMatricula);
        eventoRepository.save(evento);

        return "Inscrição realizada com sucesso!";
    }
}
