import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import AccountsRepository from './accounts.repository';
import DeserialiwedJwtDto from './models/deserialiwed.jwt.dto';

@Injectable()
export default class JwtStrategy extends PassportStrategy(Strategy) {

  constructor(private readonly accountsRepository: AccountsRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // TODO configuration
      secretOrKey: 'mySecretTokenToChangeInProduction',
    });
  }

  async validate(payload: DeserialiwedJwtDto) {
    const account = this.accountsRepository.getAccountById(payload.sub);

    if (!account) {
      throw new UnauthorizedException();
    }

    return account;
  }
}
