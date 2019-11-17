import { Module } from '@nestjs/common';
import AuthModule from './features/auth/auth.module';
import PetsModule from './features/pets/pets.module';
import UsersModule from './features/users/users.module';

@Module({
  imports: [
    AuthModule,
    PetsModule,
    UsersModule,
  ],
})
export default class AppModule { }
