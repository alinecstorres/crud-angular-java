package com.acst.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity
public class Fornecedor {

    @Id
    @JsonProperty("_document")
    private Long document;

    @Column(length = 200, nullable = false)
    private String name;

    @Column(length = 200, nullable = false)
    private String email;

    @Column(length = 8, nullable = false)
    private Long adressCode;
    
}
