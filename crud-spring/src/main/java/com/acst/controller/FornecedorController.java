package com.acst.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.acst.model.Fornecedor;
import com.acst.repository.FornecedorRepository;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api/fornecedores")
public class FornecedorController {
    
    private final FornecedorRepository fornecedorRepository;

    public FornecedorController(FornecedorRepository fornecedorRepository) {
        this.fornecedorRepository = fornecedorRepository;
    }

    @GetMapping
    public @ResponseBody List<Fornecedor> list() {
        return fornecedorRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<Fornecedor> create(@RequestBody Fornecedor entity) {
        if (fornecedorRepository.existsById(Long.parseLong(entity.getDocument()))) {
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(fornecedorRepository.save(entity));
        } else {
            return ResponseEntity.status(HttpStatus.CREATED).body(fornecedorRepository.save(entity));
        }
    }
    
}
