package com.web.todoapp.mapper;

import com.web.todoapp.dto.TodoDto;
import com.web.todoapp.model.Todo;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;
import org.springframework.stereotype.Service;

import java.util.List;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface TodoMapper {
    Todo todoDtoToTodo(TodoDto todoDto);
    List<TodoDto> todoListToTodoDtoList(List<Todo> todos);
}

