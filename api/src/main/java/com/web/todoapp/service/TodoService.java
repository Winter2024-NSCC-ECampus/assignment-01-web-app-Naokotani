package com.web.todoapp.service;

import com.web.todoapp.dto.TodoDto;
import com.web.todoapp.model.Todo;

public interface TodoService {
    TodoDto updateTodo(TodoDto todoDto, long todoId);
    Todo createTodo(TodoDto todoDto, long userId);
}
