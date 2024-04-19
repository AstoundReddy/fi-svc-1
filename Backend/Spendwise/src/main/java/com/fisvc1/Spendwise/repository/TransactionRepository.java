package com.fisvc1.Spendwise.repository;

import com.fisvc1.Spendwise.model.Transaction;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Integer> , JpaSpecificationExecutor<Transaction> {
    Page<Transaction> findByUserId(Integer userId, Pageable pageable);
    Page<Transaction> findByUser_IdAndDateBetweenAndCategory_Id(Integer userId, LocalDate startDate, LocalDate endDate, Integer categoryId, Pageable pageable);
}