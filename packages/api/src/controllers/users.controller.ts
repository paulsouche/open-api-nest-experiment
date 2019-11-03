import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiParam, ApiUseTags } from '@nestjs/swagger';
import UserCreateDto from '../models/users/user-create.dto';
import userId from '../models/users/user-id';
import UserUpdateDto from '../models/users/user-update.dto';
import UserDto from '../models/users/user.dto';
import UsersService from '../services/users.service';

@ApiUseTags('users')
@Controller('users')
export default class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get()
  @ApiOkResponse({ description: 'Returns a list of users', type: [UserDto] })
  getUsers(): UserDto[] {
    return this.usersService.getUsers();
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Returns a user', type: UserDto })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiParam({
    description: 'user id',
    name: 'id',
    type: String,
  })
  getUser(@Param('id') id: userId): UserDto {
    return this.usersService.getUser(id);
  }

  @Post()
  @ApiCreatedResponse({ description: 'Creates a user', type: UserDto })
  @ApiBadRequestResponse({ description: 'Bad request' })
  createUser(@Body() user: UserCreateDto): UserDto {
    return this.usersService.addUser(user);
  }

  @Put(':id')
  @ApiOkResponse({ description: 'Updates a user', type: UserDto })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiParam({
    description: 'user id',
    name: 'id',
    type: String,
  })
  updateUser(@Param('id') id: userId, @Body() user: UserUpdateDto): UserDto {
    return this.usersService.updateUser(id, user);
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Deletes a user', type: UserDto })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiParam({
    description: 'user id',
    name: 'id',
    type: String,
  })
  deleteUser(@Param('id') id: userId): UserDto {
    return this.usersService.removeUser(id);
  }
}
