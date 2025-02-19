export declare class BcryptService {
    static encryptString(text: string): Promise<string>;
    static comparePassword(current: string, hashed: string): Promise<boolean>;
}
