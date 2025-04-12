import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ROLE } from '../../constants/role';

@Injectable()
export class ShopMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  use(req: any, res: any, next: (error?: Error | any) => void) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: 'Token not provided' });
    }
    const token: string = authHeader.split(' ')[1];
    try {
      const payload = this.jwtService.verify(token);
      req.user = payload;
      if (req.user.role !== ROLE.SHOP) {
        return res
          .status(401)
          .json({ message: 'You are not allowed in this attemp' });
      }
      next();
    } catch (err) {
      return res.status(401).json({ message: 'Token not valid' });
    }
  }
}
