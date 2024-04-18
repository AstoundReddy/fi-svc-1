package com.fisvc1.Spendwise.repository;

import com.fisvc1.Spendwise.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category,Integer> {
}
