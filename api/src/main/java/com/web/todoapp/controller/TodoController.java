package com.web.todoapp.controller;

import com.web.todoapp.dto.TodoDto;
import com.web.todoapp.mapper.TodoMapper;
import com.web.todoapp.model.Todo;
import com.web.todoapp.model.User;
import com.web.todoapp.repository.TodoRepository;
import com.web.todoapp.repository.UserRepository;
import com.web.todoapp.service.TodoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/todo/")
public class TodoController {
    private final UserRepository userRepository;
    private final TodoMapper todoMapper;
    private final TodoRepository todoRepository;
    private final TodoService todoService;

    public TodoController(UserRepository userRepository, TodoMapper todoMapper, TodoRepository todoRepository, TodoService todoService) {
        this.userRepository = userRepository;
        this.todoMapper = todoMapper;
        this.todoRepository = todoRepository;
        this.todoService = todoService;
    }

    @PostMapping
    public ResponseEntity<Todo> createTodo(@RequestBody TodoDto todoDto, @RequestParam long userId) {
        Todo todo = todoService.createTodo(todoDto, userId);
        return new ResponseEntity<>(todo, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<TodoDto>> getTodos(@RequestParam long userId) {
        Optional<User> findUser = userRepository.findById(userId);
        User user = findUser.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        List<TodoDto> todoDtos = todoMapper.todoListToTodoDtoList(user.getTodos().stream().toList());
        return new ResponseEntity<>(todoDtos, HttpStatus.OK);
    }

    @GetMapping("{id}")
    public ResponseEntity<TodoDto> getTodo(@PathVariable long id) {
        Todo todo = todoRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        TodoDto todoDto = todoMapper.todoToTodoDto(todo);
        return new ResponseEntity<>(todoDto, HttpStatus.OK);
    }

    @DeleteMapping
    public ResponseEntity<String> deleteTodo(@RequestParam long userId, @RequestParam long todoId) {
        Todo todo = todoRepository.findById(todoId).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        User user = userRepository.findById(userId).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        user.getTodos().remove(todo);
        userRepository.save(user);
        todoRepository.delete(todo);
        return new ResponseEntity<>("Todo deleted", HttpStatus.NO_CONTENT);
    }

    @PutMapping
    public ResponseEntity<TodoDto> updateTodo(@RequestBody TodoDto todoDto, @RequestParam long todoId) {
        todoDto = todoService.updateTodo(todoDto, todoId);
        return new ResponseEntity<>(todoDto, HttpStatus.OK);
    }
}
