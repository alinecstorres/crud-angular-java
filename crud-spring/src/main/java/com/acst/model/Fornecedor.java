package com.acst.model;

import java.sql.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.Data;

@Data
@Entity
@Table(uniqueConstraints = {@UniqueConstraint(columnNames = {"document"})})
public class Fornecedor {

    @Id
    @JsonProperty("_document")
    private String document;

    @Column(length = 200, nullable = false)
    private String name;

    @Column(length = 200, nullable = false)
    private String email;

    @Column(length = 8, nullable = false)
    private Long adressCode;

    @Column(length = 200, nullable = true)
    private Long documentRG;

    @Column(length = 8, nullable = true)
    private Date birth;

    @ManyToMany(mappedBy = "contratados")
    @JsonIgnore
    private List<Empresa> contratantes;
    
}
