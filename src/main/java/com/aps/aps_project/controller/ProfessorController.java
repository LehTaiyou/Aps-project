package com.aps.aps_project.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.aps.aps_project.model.Professor;
import com.aps.aps_project.repository.ProfessorRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping(path="/professores")
public class ProfessorController {
    
    @Autowired
    private ProfessorRepository professorRepository;

    // Buscar todos os professores
    @GetMapping
    public List<Professor> buscarProfessores() {
        return professorRepository.findAll();
    }

    // Buscar professor por matrícula
    @GetMapping("/{matricula}")
    public Professor buscarProfessorPorMatricula(@PathVariable String matricula) {
        return professorRepository.findById(matricula).orElse(null);
    }
    
    // Criar um novo professor
    @PostMapping
    public Professor criarProfessor(@RequestBody Professor professor) {
        return professorRepository.save(professor);
    }
    
}
