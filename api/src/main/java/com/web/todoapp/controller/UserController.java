package com.web.todoapp.controller;

import com.web.todoapp.dto.UserDto;
import com.web.todoapp.mapper.UserMapper;
import com.web.todoapp.model.User;
import com.web.todoapp.repository.UserRepository;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/user")
public class UserController {
    private final UserRepository userRepository;
    private final UserMapper userMapper;

    public UserController(UserRepository userRepository, UserMapper userMapper) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
    }

    @GetMapping("/health")
    public ResponseEntity<String> healthCheck() {
        return new ResponseEntity<>("OK", HttpStatus.OK);
    }

    @PostMapping
    ResponseEntity<String> createUser(@RequestBody UserDto user){
        User createdUser = userMapper.UserDtoToUser(user);
        if(createdUser == null)
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
       try {
           userRepository.save(createdUser);
           return new ResponseEntity<>(HttpStatus.CREATED);
       } catch (DataAccessException e) {
           return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
       }
    }
}
