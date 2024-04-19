package com.fisvc1.Spendwise.service;

import com.fisvc1.Spendwise.exception.ResourceNotFoundException;
import com.fisvc1.Spendwise.model.Category;
import com.fisvc1.Spendwise.model.User;
import com.fisvc1.Spendwise.repository.CategoryRepository;
import com.fisvc1.Spendwise.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;
    private final UserRepository userRepository;
    public CategoryService(CategoryRepository categoryRepository, UserRepository userRepository) {
        this.categoryRepository = categoryRepository;
        this.userRepository = userRepository;
    }

    public Category createCategory(Category category, Integer userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id " + userId));
        category.setUser(user);
        return categoryRepository.save(category);
    }

    public Category updateCategory(Category category) {
        Category existingCategory = categoryRepository.findById(category.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with id " + category.getId()));
        existingCategory.setName(category.getName());
        return categoryRepository.save(existingCategory);
    }
    public List<Map<String, Object>> getCategoriesByUserId(Integer userId) {
    List<Category> categories = categoryRepository.findByUserId(userId);
    List<Map<String, Object>> categoryMaps = new ArrayList<>();
    for (Category category : categories) {
        Map<String, Object> categoryMap = new HashMap<>();
        categoryMap.put("id", category.getId());
        categoryMap.put("name", category.getName());
        categoryMaps.add(categoryMap);
    }
    return categoryMaps;
}
    public void deleteCategory(Integer id) {
        categoryRepository.deleteById(id);
    }
}