import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { v4 } from 'uuid';
import UserCreateDto from '../models/user-create-dto';
import UserDto from '../models/user-dto';
import UserUpdateDto from '../models/user-update-dto';
import UsersRepository from '../repositories/users.repository';

@Injectable()
export default class UsersService {

  constructor(private readonly usersRepository: UsersRepository) { }

  getUsers(): UserDto[] {
    return this.usersRepository.getUsers();
  }

  getUser(id: string): UserDto {
    return this.findUser(id);
  }

  addUser(user: UserCreateDto): UserDto {
    return this.usersRepository.addUser(this.mapCreateUserToUser(user));
  }

  updateUser(id: string, update: UserUpdateDto): UserDto {
    if (id !== update.id) {
      throw new BadRequestException();
    }
    return this.usersRepository.updateUser(this.findUser(id), update);
  }

  removeUser(id: string): UserDto {
    const user = this.findUser(id);
    return this.usersRepository.removeUser(user);
  }

  private mapCreateUserToUser(createUser: UserCreateDto): UserDto {
    return {
      ...createUser,
      id: v4(),
    };
  }

  private findUser(id: string) {
    const user = this.usersRepository.getUser(id);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }
}
