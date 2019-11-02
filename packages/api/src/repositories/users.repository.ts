import { Injectable } from '@nestjs/common';
import UserDto from '../models/user-dto';
import UserUpdateDto from '../models/user-update-dto';

// TODO real postgres connection
const users: UserDto[] = [];

@Injectable()
export default class UsersRepository {

  getUsers(): UserDto[] {
    return users;
  }

  getUser(id: string): UserDto | undefined {
    return users.find((u) => u.id === id);
  }

  addUser(user: UserDto): UserDto {
    users.push(user);
    return user;
  }

  updateUser(user: UserDto, update: UserUpdateDto): UserDto {
    users.splice(this.userIndex(user), 1, update);
    return update;
  }

  removeUser(user: UserDto): UserDto {
    const [removed] = users.splice(this.userIndex(user), 1);
    return removed;
  }

  private userIndex(user: UserDto): number {
    return users.findIndex((u) => u === user);
  }
}
