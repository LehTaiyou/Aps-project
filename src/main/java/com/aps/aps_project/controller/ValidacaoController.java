package com.aps.aps_project.controller;

import com.aps.aps_project.model.Aluno;
import com.aps.aps_project.model.Evento;
import com.aps.aps_project.model.ParticipacaoRequest;
import com.aps.aps_project.repository.AlunoRepository;
import com.aps.aps_project.repository.EventoRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Optional;

@RestController
@RequestMapping(path = "/validacoes")
public class ValidacaoController {

    @Autowired
    private AlunoRepository alunoRepository;

    @Autowired
    private EventoRepository eventoRepository;

    @PostMapping
    public String validarParticipacao(@RequestBody ParticipacaoRequest participacaoRequest) {
        String alunoMatricula = participacaoRequest.getAlunoMatricula();
        String eventoId = participacaoRequest.getEventoId();

        // Busca o aluno pelo ID (matrícula)
        Optional<Aluno> optionalAluno = alunoRepository.findById(alunoMatricula);
        if (!optionalAluno.isPresent()) {
            return "Aluno não encontrado.";
        }
        Aluno aluno = optionalAluno.get();

        // Busca o evento pelo ID
        Optional<Evento> optionalEvento = eventoRepository.findById(eventoId);
        if (!optionalEvento.isPresent()) {
            return "Evento não encontrado.";
        }
        Evento evento = optionalEvento.get();

        // Verifica se o aluno está inscrito no evento
        if (evento.getAlunosInscritos() == null || !evento.getAlunosInscritos().contains(alunoMatricula)) {
            return "Aluno não está inscrito neste evento.";
        }

        // Verifica se o aluno já participou do evento
        if (aluno.getEventosPresente() != null && aluno.getEventosPresente().contains(eventoId)) {
            return "Aluno já validou participação neste evento.";
        }

        // Adiciona o evento à lista de eventos participados do aluno
        if (aluno.getEventosPresente() == null) {
            aluno.setEventosPresente(new ArrayList<>());
        }
        aluno.getEventosPresente().add(eventoId);

        // Soma a carga horária do evento às horas cumpridas do aluno
        aluno.setHorasCumpridas(aluno.getHorasCumpridas() + evento.getCargaHoraria());

        // Salva o aluno com a participação validada
        alunoRepository.save(aluno);

        return "Participação validada com sucesso!";
    }
}
