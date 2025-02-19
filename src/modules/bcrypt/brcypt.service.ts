import * as bcrypt from 'bcrypt';

export class BcryptService {
  static async encryptString(text: string): Promise<string> {
    const saltRounds = 10;
    return await bcrypt.hash(text, saltRounds);
  }

  static async comparePassword(
    current: string,
    hashed: string,
  ): Promise<boolean> {
    return await bcrypt.compare(current, hashed);
  }
}
