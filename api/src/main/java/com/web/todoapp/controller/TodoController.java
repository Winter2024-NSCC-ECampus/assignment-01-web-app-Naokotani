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
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.List;

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

    private User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        return userRepository.findByEmail(email);
    }

    @PostMapping
    public ResponseEntity<Todo> createTodo(@RequestBody TodoDto todoDto) {
        User user = getCurrentUser();
        Todo todo = todoService.createTodo(todoDto, user.getId());
        return new ResponseEntity<>(todo, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<TodoDto>> getTodos() {
        User user = getCurrentUser();
        List<TodoDto> todoDtos = todoMapper.todoListToTodoDtoList(user.getTodos().stream().toList());
        return new ResponseEntity<>(todoDtos, HttpStatus.OK);
    }

    @GetMapping("{id}")
    public ResponseEntity<TodoDto> getTodo(@PathVariable long id) {
        User user = getCurrentUser();
        Todo todo = user.getTodos()
                .stream().filter(t -> t.getId() == id)
                .findFirst().orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND));
        TodoDto todoDto = todoMapper.todoToTodoDto(todo);
        return new ResponseEntity<>(todoDto, HttpStatus.OK);
    }

    @DeleteMapping
    public ResponseEntity<String> deleteTodo(@RequestParam long todoId) {
        User user = getCurrentUser();
        Todo todo = user.getTodos()
                .stream().filter(t -> t.getId() == todoId)
                .findFirst().orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND));
        user.getTodos().remove(todo);
        userRepository.save(user);
        todoRepository.delete(todo);
        return new ResponseEntity<>("Todo deleted", HttpStatus.NO_CONTENT);
    }

    @PutMapping
    public ResponseEntity<TodoDto> updateTodo(@RequestBody TodoDto todoDto, @RequestParam long todoId) {
        User user = getCurrentUser();
        todoDto = todoService.updateTodo(todoDto, todoId, user);
        return new ResponseEntity<>(todoDto, HttpStatus.OK);
    }
}
