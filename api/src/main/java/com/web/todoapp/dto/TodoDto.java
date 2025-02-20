package com.web.todoapp.dto;

import lombok.Data;

@Data
public class TodoDto {
    private String id;
    private String title;
    private String description;
    private String dueDate;
    private String createDate;

}