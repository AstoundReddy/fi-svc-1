package com.fisvc1.Spendwise.controller;

import com.fisvc1.Spendwise.model.Category;
import com.fisvc1.Spendwise.service.CategoryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/categories")
@CrossOrigin(origins = "http://localhost:3000")
public class CategoryController {

    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @PostMapping("/user/{userId}")
    public ResponseEntity<Map<String, Object>> createCategory(@RequestBody Category category, @PathVariable Integer userId) {
        Category createdCategory = categoryService.createCategory(category, userId);
        Map<String, Object> response = new HashMap<>();
        response.put("id", createdCategory.getId());
        response.put("message", "Category created successfully");
        return ResponseEntity.created(null).body(response);
    }

    @PutMapping
    public ResponseEntity<Map<String, Object>> updateCategory(@RequestBody Category category) {
        Category updatedCategory = categoryService.updateCategory(category);
        Map<String, Object> response = new HashMap<>();
        response.put("id", updatedCategory.getId());
        response.put("message", "Category updated successfully");
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCategory(@PathVariable Integer id) {
        categoryService.deleteCategory(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Map<String, Object>>> getCategoriesByUserId(@PathVariable Integer userId) {
        return ResponseEntity.ok(categoryService.getCategoriesByUserId(userId));
    }
}
