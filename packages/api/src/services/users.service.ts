import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { v4 } from 'uuid';
import UserCreateDto from '../models/users/user-create.dto';
import userId from '../models/users/user-id';
import UserUpdateDto from '../models/users/user-update.dto';
import UserDto from '../models/users/user.dto';
import UsersRepository from '../repositories/users.repository';

@Injectable()
export default class UsersService {

  constructor(private readonly usersRepository: UsersRepository) { }

  getUsers(): UserDto[] {
    return this.usersRepository.getUsers();
  }

  getUser(id: userId): UserDto {
    return this.findUser(id);
  }

  addUser(user: UserCreateDto): UserDto {
    return this.usersRepository.addUser(this.mapCreateUserToUser(user));
  }

  updateUser(id: userId, update: UserUpdateDto): UserDto {
    if (id !== update.id) {
      throw new BadRequestException();
    }
    return this.usersRepository.updateUser(this.findUser(id), update);
  }

  removeUser(id: userId): UserDto {
    const user = this.findUser(id);
    return this.usersRepository.removeUser(user);
  }

  private mapCreateUserToUser(createUser: UserCreateDto): UserDto {
    return {
      ...createUser,
      id: this.generateUserId(),
    };
  }

  private findUser(id: userId) {
    const user = this.usersRepository.getUser(id);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  private generateUserId(): userId {
    return v4() as any;
  }
}
