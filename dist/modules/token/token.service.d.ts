import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../../interface/jwt-payload';
export declare class TokenService {
    private readonly jwtService;
    constructor(jwtService: JwtService);
    generateToken(payload: JwtPayload): string;
    verifyToken(token: string): any;
}
