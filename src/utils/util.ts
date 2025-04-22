import * as crypto from 'crypto';

export class Utils {
  static generateBigInt(): bigint {
    const buffer = crypto.randomBytes(8);
    return BigInt('0x' + buffer.toString('hex'));
  }
}
