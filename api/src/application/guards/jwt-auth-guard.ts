import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import ITokenValidationService from './token-validation-service';
import { Reflector } from '@nestjs/core';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly jwtValidationService: ITokenValidationService,
    private readonly reflector: Reflector,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromRequest(request);
    const allowedRoles = this.reflector.getAllAndOverride<string[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!token) {
      throw new UnauthorizedException('Token not found');
    }

    const { userId, role } = this.jwtValidationService.validateToken(token);

    if (allowedRoles && !allowedRoles.includes(role)) {
      throw new UnauthorizedException('Insufficient privileges');
    }

    // Add the extracted user ID and role to the request object for later use
    request.user = { userId, role };
    return true;
  }

  private extractTokenFromRequest(request: Request): string {
    // Extract the token from the request headers, query parameters, or cookies
    // Adjust this according to your specific token extraction method
    const authHeader = request.headers['authorization'];
    if (authHeader && authHeader.startsWith('Bearer ')) {
      return authHeader.substring(7);
    }
    return null;
  }
}
