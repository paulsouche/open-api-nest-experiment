import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import AccountsRepository from './accounts.repository';
import CredentialsDto from './models/credentials.dto';
import JwtDto from './models/jwt.dto';

@Injectable()
export default class AuthService {
  constructor(private readonly accountsRepository: AccountsRepository, private readonly jwtService: JwtService) { }

  public async login({login, password}: CredentialsDto): Promise<[JwtDto, string]> {
    const account = this.accountsRepository.getAccountByLogin(login);

    if (!account || !(await this.accountsRepository.compareHash(password, account.passwordHash))) {
      throw new UnauthorizedException();
    }

    const dto = {
      jwt: await this.jwtService.signAsync({ sub: account.id }),
    };

    const refreshToken = await this.jwtService.signAsync({ sub: account.id }, {
      expiresIn: 3600 * 27 * 7, // seven days
    });

    return [dto, refreshToken];
  }
}
