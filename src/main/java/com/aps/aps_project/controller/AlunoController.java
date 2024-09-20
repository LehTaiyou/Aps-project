package com.aps.aps_project.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.aps.aps_project.model.Aluno;
import com.aps.aps_project.repository.AlunoRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping(path="/alunos")
public class AlunoController {
    
    @Autowired
    private AlunoRepository alunoRepository;

    // Buscar todos os alunos
    @GetMapping
    public List<Aluno> buscarAlunos() {
        return alunoRepository.findAll();
    }

    // Buscar aluno por matrícula
    @GetMapping("/{matricula}")
    public Aluno buscarAlunoPorMatricula(@PathVariable String matricula) {
        return alunoRepository.findById(matricula).orElse(null);
    }
    
    // Criar um novo aluno
    @PostMapping
    public Aluno criarAluno(@RequestBody Aluno aluno) {
        return alunoRepository.save(aluno);
    }
    
}
