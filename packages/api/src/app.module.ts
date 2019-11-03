import { Module } from '@nestjs/common';
import AppController from './controllers/app.controller';
import PetsController from './controllers/pets.controller';
import UsersController from './controllers/users.controller';
import PetsRepository from './repositories/pets.repository';
import UsersRepository from './repositories/users.repository';
import AppService from './services/app.service';
import PetsService from './services/pets.service';
import UsersService from './services/users.service';

@Module({
  controllers: [AppController, UsersController, PetsController],
  imports: [],
  providers: [AppService, PetsRepository, UsersRepository, PetsService, UsersService],
})
export default class AppModule { }
