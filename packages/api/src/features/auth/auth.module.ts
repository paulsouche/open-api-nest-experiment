import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import AccountsRepository from './accounts.repository';
import AuthController from './auth.controller';
import AuthService from './auth.service';

@Module({
  controllers: [AuthController],
  // TODO config
  imports: [
    JwtModule.register({
      secretOrPrivateKey: 'mySecretTokenToChangeInProduction',
      signOptions: {
        expiresIn: 3600,
      },
    }),
  ],
  providers: [AuthService, AccountsRepository],
})
export default class AuthModule { }
