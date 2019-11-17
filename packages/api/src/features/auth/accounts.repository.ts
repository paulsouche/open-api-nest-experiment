import { Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';
import uuid from 'uuid';
import accountId from './models/account-id';
import Account from './models/account.interface';
import passwordHash from './models/password-hash';

// TODO real postgres connection
const accounts: Account[] = [
  {
    id: uuid.v4() as unknown as accountId,
    login: 'admin',
    passwordHash: bcrypt.hashSync('admin', 10) as unknown as passwordHash,
  },
];

@Injectable()
export default class AccountsRepository {
  getAccountByLogin(lgn: string): Account | undefined {
    return accounts.find(({ login }) => login === lgn);
  }

  compareHash(password: string, hash: passwordHash): Promise<boolean> {
    return bcrypt.compare(password, hash.toString());
  }
}
