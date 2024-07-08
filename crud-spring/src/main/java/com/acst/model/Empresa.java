package com.acst.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.Data;

@Data
@Entity
@Table(uniqueConstraints = {@UniqueConstraint(columnNames = {"document"})})
public class Empresa {

    @Id
    @JsonProperty("_document")
    private String document;

    @Column(length = 200, nullable = false)
    private String name;

    @Column(length = 8, nullable = false)
    private Long adressCode;

    @ManyToMany
    @JoinTable(
    name = "empresa_fornecedor",
    joinColumns = @JoinColumn(name = "empresa_document"), 
    inverseJoinColumns = @JoinColumn(name = "fornecedor_document")  // Coluna que referencia o Fornecedor
    )
    @JsonIgnore
    private List<Fornecedor> contratados;
    
}
