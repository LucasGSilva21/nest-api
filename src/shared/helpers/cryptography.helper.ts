import * as bcrypt from 'bcrypt';
import { Cryptography } from '../interfaces/cryptography.interface';

export class CryptographyHelper implements Cryptography {
  async hash(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async compare(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
