package com.fisvc1.Spendwise.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "category")
public class Category {
    @Id
    @GeneratedValue
    private Integer id;
    private String name;

    @ManyToOne
    private User user; // This is null for system-defined categories
}