import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import ITokenValidationService from 'src/application/guards/token-validation-service';

@Injectable()
export class JwtValidationService implements ITokenValidationService {
  constructor(private readonly jwtService: JwtService) {}

  validateToken(token: string): { userId: string, role: string } {
    try {
      const decoded = this.jwtService.verify(token);
      return {
        userId: decoded.userId,
        role: decoded.role,
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
