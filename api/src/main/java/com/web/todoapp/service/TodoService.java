package com.web.todoapp.service;

import com.web.todoapp.dto.TodoDto;
import com.web.todoapp.model.Todo;
import com.web.todoapp.model.User;

public interface TodoService {
    TodoDto updateTodo(TodoDto todoDto, long todoId, User user);
    Todo createTodo(TodoDto todoDto, long userId);
}
