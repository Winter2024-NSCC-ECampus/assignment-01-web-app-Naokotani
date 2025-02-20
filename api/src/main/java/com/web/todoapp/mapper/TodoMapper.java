package com.web.todoapp.mapper;

import com.web.todoapp.dto.TodoDto;
import com.web.todoapp.model.Todo;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;
import org.mapstruct.Named;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.List;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface TodoMapper {
    @Mapping(target = "dueDate", qualifiedByName = "parseDueDate", source = "dueDate")
    Todo todoDtoToTodo(TodoDto todoDto);
    TodoDto todoToTodoDto(Todo todo);
    List<TodoDto> todoListToTodoDtoList(List<Todo> todos);

    @Named("parseDueDate")
    default LocalDate parseDueDate(String dueDate) {
        try {
            DateTimeFormatter formatter =
                    DateTimeFormatter.ofPattern("yyyy-MM-dd");
            return LocalDate.parse(dueDate, formatter);
        } catch (DateTimeParseException exc) {
            System.out.printf("%s is not parsable!%n", dueDate);
            throw exc;      // Rethrow the exception.
        }
    }
}


