package com.web.todoapp.service;

import com.web.todoapp.dto.TodoDto;
import com.web.todoapp.mapper.TodoMapper;
import com.web.todoapp.model.Todo;
import com.web.todoapp.model.User;
import com.web.todoapp.repository.TodoRepository;
import com.web.todoapp.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.Optional;

@Service
public class TodoServiceImpl implements TodoService {
    private  final UserRepository userRepository;
    private final TodoRepository todoRepository;
    private final TodoMapper todoMapper;

    public TodoServiceImpl(UserRepository userRepository, TodoRepository todoRepository, TodoMapper todoMapper) {
        this.userRepository = userRepository;
        this.todoRepository = todoRepository;
        this.todoMapper = todoMapper;
    }

    @Override
    public TodoDto updateTodo(TodoDto todoDto, long todoId) throws ResponseStatusException {
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
        return todoMapper.todoToTodoDto(todo);
    }

    @Override
    public Todo createTodo(TodoDto todoDto, long userId) throws ResponseStatusException {
        Optional<User> findUser = userRepository.findById(userId);
        User user = findUser.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        Todo todo = todoMapper.todoDtoToTodo(todoDto);
        todo.setCreateDate(LocalDateTime.now());
        todo = todoRepository.save(todo);
        user.getTodos().add(todo);
        userRepository.save(user);
        return todo;
    }
}
