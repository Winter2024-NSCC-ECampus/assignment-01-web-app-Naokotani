package com.web.todoapp.repository;

import com.web.todoapp.model.Todo;
import com.web.todoapp.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
}
