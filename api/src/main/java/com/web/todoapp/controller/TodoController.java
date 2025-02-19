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

    @PostMapping("{id}")
    public ResponseEntity<Todo> createTodo(@RequestBody TodoDto todoDto, @PathVariable long id) {
        Optional<User> findUser = userRepository.findById(id);
        User user = findUser.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        Todo todo = todoMapper.todoDtoToTodo(todoDto);
        todo = todoRepository.save(todo);
        user.getTodos().add(todo);
        userRepository.save(user);
        return new ResponseEntity<>(todo, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<TodoDto>> getTodos(@RequestParam long id) {
        Optional<User> findUser = userRepository.findById(id);
        User user = findUser.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        List<TodoDto> todoDtos = todoMapper.todoListToTodoDtoList(user.getTodos().stream().toList());
        return new ResponseEntity<>(todoDtos, HttpStatus.OK);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteTodo(@PathVariable long id) {
        Optional<Todo> findTodo = todoRepository.findById(id);
        Todo todo = findTodo.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        todoRepository.delete(todo);
        return new ResponseEntity<>("Todo deleted", HttpStatus.NO_CONTENT);
    }

    @PutMapping("{id}")
    public ResponseEntity<TodoDto> updateTodo(@RequestBody TodoDto todoDto, @PathVariable long id) {
        todoRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        Todo todo = todoMapper.todoDtoToTodo(todoDto);
        todo.setId(id);
        todoRepository.save(todo);
        return new ResponseEntity<>(todoDto, HttpStatus.OK);
    }
}
