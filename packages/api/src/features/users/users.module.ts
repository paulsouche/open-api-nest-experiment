import { forwardRef, Module } from '@nestjs/common';
import AuthModule from '../auth/auth.module';
import PetsModule from '../pets/pets.module';
import UsersController from './users.controller';
import UsersRepository from './users.repository';
import UsersService from './users.service';

@Module({
  controllers: [UsersController],
  exports: [UsersService],
  imports: [
    forwardRef(() => AuthModule),
    forwardRef(() => PetsModule),
  ],
  providers: [UsersRepository, UsersService],
})
export default class UsersModule { }
