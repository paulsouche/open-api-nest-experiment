import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { v4 } from 'uuid';
import UserCreateDto from '../models/users/user-create.dto';
import UserDetailedDto from '../models/users/user-detailed.dto';
import userId from '../models/users/user-id';
import UserUpdateDto from '../models/users/user-update.dto';
import UserDto from '../models/users/user.dto';
import PetsRepository from '../repositories/pets.repository';
import UsersRepository from '../repositories/users.repository';

@Injectable()
export default class UsersService {

  constructor(private readonly usersRepository: UsersRepository, private readonly petsRepository: PetsRepository) { }

  getUsers(): UserDto[] {
    return this.usersRepository.getUsers();
  }

  getUser(id: userId): UserDto {
    return this.findUser(id);
  }

  getDetailedUser(id: userId): UserDetailedDto {
    const user = this.findUser(id);
    return this.mapUserToDetailedUser(user);
  }

  addUser(user: UserCreateDto): UserDetailedDto {
    const created = this.usersRepository.addUser(this.mapCreateUserToUser(user));
    return this.mapUserToDetailedUser(created);
  }

  updateUser(id: userId, update: UserUpdateDto): UserDetailedDto {
    if (id !== update.id) {
      throw new BadRequestException();
    }
    const user = this.usersRepository.updateUser(this.findUser(id), update);
    return this.mapUserToDetailedUser(user);
  }

  removeUser(id: userId): UserDetailedDto {
    const user = this.findUser(id);
    const removed = this.usersRepository.removeUser(user);
    return this.mapUserToDetailedUser(removed);
  }

  private mapCreateUserToUser(createUser: UserCreateDto): UserDto {
    return {
      ...createUser,
      id: this.generateUserId(),
    };
  }

  private mapUserToDetailedUser(user: UserDto): UserDetailedDto {
    const pets = this.petsRepository.getPetsForUser(user.id);
    return {
      ...user,
      pets,
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
