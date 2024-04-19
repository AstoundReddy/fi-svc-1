package com.fisvc1.Spendwise.service;

import com.fisvc1.Spendwise.exception.ResourceNotFoundException;
import com.fisvc1.Spendwise.model.Category;
import com.fisvc1.Spendwise.model.Transaction;
import com.fisvc1.Spendwise.model.User;
import com.fisvc1.Spendwise.repository.CategoryRepository;
import com.fisvc1.Spendwise.repository.TransactionRepository;
import com.fisvc1.Spendwise.repository.UserRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class TransactionService {

    private final TransactionRepository transactionRepository;
    private final CategoryRepository categoryRepository;
    private final UserRepository userRepository;
    @Autowired
    private EntityManager entityManager;

    public Page<Transaction> getTransactionsByUserId(Integer userId, LocalDate startDate, LocalDate endDate, Optional<List<Integer>> categories, Optional<Double> minAmount, Optional<Double> maxAmount, Pageable pageable) {
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<Transaction> cq = cb.createQuery(Transaction.class);

        Root<Transaction> transaction = cq.from(Transaction.class);
        List<Predicate> predicates = new ArrayList<>();

        predicates.add(cb.equal(transaction.get("user").get("id"), userId));
        predicates.add(cb.between(transaction.get("date"), startDate, endDate));

        categories.ifPresent(cats -> predicates.add(transaction.get("category").get("id").in(cats)));
        minAmount.ifPresent(min -> predicates.add(cb.greaterThanOrEqualTo(transaction.get("amount"), min)));
        maxAmount.ifPresent(max -> predicates.add(cb.lessThanOrEqualTo(transaction.get("amount"), max)));

        cq.where(predicates.toArray(new Predicate[0]));

        List<Transaction> transactions = entityManager.createQuery(cq).getResultList();

        // Convert the result list to a page
        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), transactions.size());
        return new PageImpl<>(transactions.subList(start, end), pageable, transactions.size());
    }
    public Transaction createTransaction(Transaction transaction , Integer userId) {
        if (transaction.getCategory() == null || transaction.getCategory().getId() == null) {
            throw new IllegalArgumentException("Transaction must have a category");
        }
        if(userId == null){
            throw new IllegalArgumentException("User id cannot be null");
        }
        Category category = categoryRepository.findById(transaction.getCategory().getId())
            .orElseThrow(() -> new ResourceNotFoundException("Category not found with id " + transaction.getCategory().getId()));
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new ResourceNotFoundException("User not found with id " + userId));
        transaction.setCategory(category);
        transaction.setUser(user);
        return transactionRepository.save(transaction);
    }


    public Transaction updateTransaction(Transaction transaction) {
        Transaction existingTransaction = transactionRepository.findById(transaction.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Transaction not found with id " + transaction.getId()));

        if (transaction.getAmount() != null) {
            existingTransaction.setAmount(transaction.getAmount());
        }
        if (transaction.getDate() != null) {
            existingTransaction.setDate(transaction.getDate());
        }
        if (transaction.getCategory() != null && transaction.getCategory().getId() != null) {
            Category category = categoryRepository.findById(transaction.getCategory().getId())
                    .orElseThrow(() -> new ResourceNotFoundException("Category not found with id " + transaction.getCategory().getId()));
            existingTransaction.setCategory(category);
        }
        if (transaction.getDescription() != null) {
            existingTransaction.setDescription(transaction.getDescription());
        }
        return transactionRepository.save(existingTransaction);
    }

    public void deleteTransaction(Integer id) {
        transactionRepository.deleteById(id);
    }
}