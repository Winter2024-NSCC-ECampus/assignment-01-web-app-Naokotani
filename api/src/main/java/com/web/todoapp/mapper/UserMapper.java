package com.web.todoapp.mapper;

import com.web.todoapp.dto.UserDto;
import com.web.todoapp.model.User;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface UserMapper {
    User UserDtoToUser(UserDto user);
    UserDto UserToUserDto(User user);
}
