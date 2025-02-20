package com.web.todoapp.controller;

import com.web.todoapp.dto.TodoDto;
import com.web.todoapp.mapper.TodoMapper;
import com.web.todoapp.model.Todo;
import com.web.todoapp.model.User;
import com.web.todoapp.repository.TodoRepository;
import com.web.todoapp.repository.UserRepository;
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

    public TodoController(UserRepository userRepository, TodoMapper todoMapper, TodoRepository todoRepository) {
        this.userRepository = userRepository;
        this.todoMapper = todoMapper;
        this.todoRepository = todoRepository;
    }

    @PostMapping
    public ResponseEntity<Todo> createTodo(@RequestBody TodoDto todoDto, @RequestParam long userId) {
        Optional<User> findUser = userRepository.findById(userId);
        try {
            DateTimeFormatter formatter =
                    DateTimeFormatter.ofPattern("yyyy-MM-dd");
            LocalDate date = LocalDate.parse(todoDto.getDueDate(), formatter);
            System.out.printf("%s%n", date);
        } catch (DateTimeParseException exc) {
            System.out.printf("%s is not parsable!%n", todoDto.getDueDate());
            throw exc;      // Rethrow the exception.
        }
        User user = findUser.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        Todo todo = todoMapper.todoDtoToTodo(todoDto);
        LocalDateTime now = LocalDateTime.now();
        todo.setCreateDate(now);
        todo = todoRepository.save(todo);
        user.getTodos().add(todo);
        userRepository.save(user);
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
        Todo todo = todoRepository.findById(todoId).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        LocalDate date;
        try {
            DateTimeFormatter formatter =
                    DateTimeFormatter.ofPattern("yyyy-MM-dd");
            date = LocalDate.parse(todoDto.getDueDate(), formatter);
            System.out.printf("%s%n", date);
        } catch (DateTimeParseException exc) {
            System.out.printf("%s is not parsable!%n", todoDto.getDueDate());
            throw exc;      // Rethrow the exception.
        }
        todo.setDescription(todoDto.getDescription());
        todo.setDueDate(date);
        todo.setTitle(todoDto.getTitle());
        todo.setId(todoId);
        todo = todoRepository.save(todo);
        todoDto = todoMapper.todoToTodoDto(todo);
        return new ResponseEntity<>(todoDto, HttpStatus.OK);
    }
}
