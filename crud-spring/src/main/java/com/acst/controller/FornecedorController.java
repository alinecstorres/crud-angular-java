package com.acst.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.acst.model.Fornecedor;
import com.acst.repository.FornecedorRepository;

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
}
