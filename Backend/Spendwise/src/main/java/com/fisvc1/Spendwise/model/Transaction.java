package com.fisvc1.Spendwise.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Data
@Table(name = "transaction")
public class Transaction {
    @Id
    @GeneratedValue
    private Integer id;
    private LocalDate date;
    private Double amount;

    @ManyToOne
    private Category category;

    private String description;

    @ManyToOne
    private User user;
}