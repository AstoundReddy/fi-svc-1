package com.fisvc1.Spendwise.repository;

import com.fisvc1.Spendwise.model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TransactionRepository extends JpaRepository<Transaction,Integer> {
}
