package main.dto;

import main.model.User;

public class UserMapper {
    public static DtoUser map(User user){
        DtoUser dtoUser = new DtoUser();
        dtoUser.setName(user.getName());
        return dtoUser;
    }
}
