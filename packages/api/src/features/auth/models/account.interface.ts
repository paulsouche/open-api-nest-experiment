import accountId from './account-id';
import passwordHash from './password-hash';

export default interface Account {
  id: accountId;
  login: string;
  passwordHash: passwordHash;
}
