package com.fisvc1.Spendwise.controller;

import com.fisvc1.Spendwise.model.Transaction;
import com.fisvc1.Spendwise.service.TransactionService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/transactions")
@CrossOrigin(origins = "http://localhost:3000")
@AllArgsConstructor
public class TransactionController {

    private final TransactionService transactionService;

    @PostMapping("/user/{userId}")
    public ResponseEntity<Map<String, Object>> createTransaction(@RequestBody Transaction transaction, @PathVariable Integer userId) {
//        System.out.println(transaction);
        Transaction createdTransaction = transactionService.createTransaction(transaction, userId);
        Map<String, Object> response = new HashMap<>();
        response.put("id", createdTransaction.getId());
        response.put("message", "Transaction created successfully");
        return ResponseEntity.created(null).body(response);
    }

    @PutMapping
    public ResponseEntity<Map<String, Object>> updateTransaction(@RequestBody Transaction transaction) {
        Transaction updatedTransaction = transactionService.updateTransaction(transaction);
        Map<String, Object> response = new HashMap<>();
        response.put("id", updatedTransaction.getId());
        response.put("message", "Transaction updated successfully");
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTransaction(@PathVariable Integer id) {
        transactionService.deleteTransaction(id);
        return ResponseEntity.noContent().build();
    }
    @GetMapping("/user/{userId}")
    public ResponseEntity<Page<Transaction>> getTransactionsByUserId(@PathVariable Integer userId,
                                                                     @RequestParam("startDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
                                                                     @RequestParam("endDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate,
                                                                     @RequestParam("categories") Optional<List<Integer>> categories,
                                                                     @RequestParam("minAmount") Optional<Double> minAmount,
                                                                     @RequestParam("maxAmount") Optional<Double> maxAmount,
                                                                     Pageable pageable) {
        Page<Transaction> transactions = transactionService.getTransactionsByUserId(userId, startDate, endDate, categories, minAmount, maxAmount, pageable);
        return ResponseEntity.ok(transactions);
    }
}