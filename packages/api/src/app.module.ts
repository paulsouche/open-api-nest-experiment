import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import AuthController from './controllers/auth.controller';
import PetsController from './controllers/pets.controller';
import UsersController from './controllers/users.controller';
import AccountsRepository from './repositories/accounts.repository';
import PetsRepository from './repositories/pets.repository';
import UsersRepository from './repositories/users.repository';
import AuthService from './services/auth.service';
import PetsService from './services/pets.service';
import UsersService from './services/users.service';

@Module({
  controllers: [UsersController, PetsController, AuthController],
  // TODO config
  imports: [
    JwtModule.register({
      secretOrPrivateKey: 'mySecretTokenToChangeInProduction',
      signOptions: {
        expiresIn: 3600,
      },
    }),
  ],
  providers: [PetsRepository, UsersRepository, PetsService, UsersService, AuthService, AccountsRepository],
})
export default class AppModule { }
