package com.acst.controller;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.acst.model.Empresa;
import com.acst.model.Fornecedor;
import com.acst.repository.EmpresaRepository;
import com.acst.repository.FornecedorRepository;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api/fornecedores/empresas")
public class EmpresaController {
    
    @Autowired
    private EmpresaRepository empresaRepository;

    @Autowired
    private FornecedorRepository fornecedorRepository;    
    

    @GetMapping
    public List<Empresa> list() {
        return empresaRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<Empresa> create(@RequestBody Empresa entity) {
        if (empresaRepository.existsById(Long.parseLong(entity.getDocument()))) {
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(empresaRepository.save(entity));
        } else {
            return ResponseEntity.status(HttpStatus.CREATED).body(empresaRepository.save(entity));
        }
    }

    @PutMapping("/contratar")
    public void contract(@RequestBody Map<String, Long> requestBody) {

        Long fornecedorId = requestBody.get("fornecedor");
        Long empresaId = requestBody.get("empresa");

        Optional<Empresa> optionalEmpresa = this.empresaRepository.findById(empresaId);
        Optional<Fornecedor> optionalFornecedor = this.fornecedorRepository.findById(fornecedorId);

        if (optionalEmpresa.isPresent() && optionalFornecedor.isPresent()) {
            Empresa contratante = optionalEmpresa.get();
            Fornecedor contratado = optionalFornecedor.get();
    
            List<Fornecedor> listaContratados = contratante.getContratados();
            List<Empresa> listaContratantes = contratado.getContratantes();
    
            if (!listaContratados.contains(contratado)) {
                listaContratados.add(contratado);
                listaContratantes.add(contratante);
    
                empresaRepository.save(contratante);
                fornecedorRepository.save(contratado);
            } else {
                throw new IllegalStateException("Fornecedor já contratado pela empresa.");
            }
        } else {
            throw new IllegalArgumentException("Empresa ou fornecedor não encontrados.");
        }
        
    }
    
    
}
