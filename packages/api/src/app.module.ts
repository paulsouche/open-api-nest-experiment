import { Module } from '@nestjs/common';
import PetsController from './controllers/pets.controller';
import UsersController from './controllers/users.controller';
import PetsRepository from './repositories/pets.repository';
import UsersRepository from './repositories/users.repository';
import PetsService from './services/pets.service';
import UsersService from './services/users.service';

@Module({
  controllers: [UsersController, PetsController],
  imports: [],
  providers: [PetsRepository, UsersRepository, PetsService, UsersService],
})
export default class AppModule { }
