import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiParam, ApiUseTags } from '@nestjs/swagger';
import UserCreateDto from './models/user-create.dto';
import UserDetailedDto from './models/user-detailed.dto';
import userId from './models/user-id';
import UserUpdateDto from './models/user-update.dto';
import UserDto from './models/user.dto';
import UsersService from './users.service';

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
  @ApiOkResponse({ description: 'Returns a user', type: UserDetailedDto })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiParam({
    description: 'user id',
    name: 'id',
    type: String,
  })
  getUser(@Param('id') id: userId): UserDetailedDto {
    return this.usersService.getDetailedUser(id);
  }

  @Post()
  @ApiCreatedResponse({ description: 'Creates a user', type: UserDetailedDto })
  @ApiBadRequestResponse({ description: 'Bad request' })
  createUser(@Body() user: UserCreateDto): UserDetailedDto {
    return this.usersService.addUser(user);
  }

  @Put(':id')
  @ApiOkResponse({ description: 'Updates a user', type: UserDetailedDto })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiParam({
    description: 'user id',
    name: 'id',
    type: String,
  })
  updateUser(@Param('id') id: userId, @Body() user: UserUpdateDto): UserDetailedDto {
    return this.usersService.updateUser(id, user);
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Deletes a user', type: UserDetailedDto })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiParam({
    description: 'user id',
    name: 'id',
    type: String,
  })
  deleteUser(@Param('id') id: userId): UserDetailedDto {
    return this.usersService.removeUser(id);
  }
}
