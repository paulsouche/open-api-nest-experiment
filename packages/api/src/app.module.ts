import { Module } from '@nestjs/common';
import AppController from './controllers/app.controller';
import UsersController from './controllers/users.controller';
import UsersRepository from './repositories/users.repository';
import AppService from './services/app.service';
import UsersService from './services/users.service';

@Module({
  controllers: [AppController, UsersController],
  imports: [],
  providers: [AppService, UsersRepository, UsersService],
})
export default class AppModule {}
