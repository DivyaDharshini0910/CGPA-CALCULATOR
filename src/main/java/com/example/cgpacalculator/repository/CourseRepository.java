package com.example.cgpacalculator.repository;

import com.example.cgpacalculator.model.Course;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CourseRepository extends MongoRepository<Course, String> {
    // MongoRepository automatically provides findAll() and other CRUD operations
}
