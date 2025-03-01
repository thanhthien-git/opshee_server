import { NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
export declare class ShopMiddleware implements NestMiddleware {
    private readonly jwtService;
    constructor(jwtService: JwtService);
    use(req: any, res: any, next: (error?: Error | any) => void): any;
}
