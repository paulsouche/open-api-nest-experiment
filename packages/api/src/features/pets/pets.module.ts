import { forwardRef, Module } from '@nestjs/common';
import UsersModule from '../users/users.module';
import PetsController from './pets.controller';
import PetsRepository from './pets.repository';
import PetsService from './pets.service';

@Module({
  controllers: [PetsController],
  exports: [PetsRepository],
  imports: [forwardRef(() => UsersModule)],
  providers: [PetsRepository, PetsService],
})
export default class PetsModule { }
