import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
// tslint:disable-next-line: max-line-length
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiParam, ApiUnauthorizedResponse, ApiUseTags } from '@nestjs/swagger';
import UserCreateDto from './models/user-create.dto';
import UserDetailedDto from './models/user-detailed.dto';
import userId from './models/user-id';
import UserUpdateDto from './models/user-update.dto';
import UserDto from './models/user.dto';
import UsersService from './users.service';

@ApiUseTags('users')
@ApiBearerAuth()
@Controller('users')
@UseGuards(AuthGuard())
export default class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get()
  @ApiOkResponse({ description: 'Returns a list of users', type: [UserDto] })
  @ApiUnauthorizedResponse({ description: 'Invalid Authorization header' })
  getUsers(): UserDto[] {
    return this.usersService.getUsers();
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Returns a user', type: UserDetailedDto })
  @ApiUnauthorizedResponse({ description: 'Invalid Authorization header' })
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
  @ApiUnauthorizedResponse({ description: 'Invalid Authorization header' })
  createUser(@Body() user: UserCreateDto): UserDetailedDto {
    return this.usersService.addUser(user);
  }

  @Put(':id')
  @ApiOkResponse({ description: 'Updates a user', type: UserDetailedDto })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiUnauthorizedResponse({ description: 'Invalid Authorization header' })
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
  @ApiUnauthorizedResponse({ description: 'Invalid Authorization header' })
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
