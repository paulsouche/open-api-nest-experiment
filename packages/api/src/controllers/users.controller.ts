import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import UserCreateDto from '../models/user-create-dto';
import UserDto from '../models/user-dto';
import UserUpdateDto from '../models/user-update-dto';
import UsersService from '../services/users.service';

@Controller('users')
export default class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get()
  getUsers(): UserDto[] {
    return this.usersService.getUsers();
  }

  @Get(':id')
  getUser(@Param('id') id: string): UserDto {
    return this.usersService.getUser(id);
  }

  @Post()
  createUser(@Body() user: UserCreateDto): UserDto {
    return this.usersService.addUser(user);
  }

  @Put(':id')
  updateUser(@Param('id') id: string, @Body() user: UserUpdateDto): UserDto {
    return this.usersService.updateUser(id, user);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string): UserDto {
    return this.usersService.removeUser(id);
  }
}
