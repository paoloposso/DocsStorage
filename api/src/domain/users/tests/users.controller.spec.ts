import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../users.controller';
import { IUsersRepository } from '../users.repository';
import { MockUsersRepository } from './mock-users-repository';
import { IUsersService, UsersService } from '../users.service';
import { AuthService, IAuthService } from '../auth.service';
import ITokenValidationService from '../../../application/guards/token-validation-service';
import { JwtValidationService } from '../../../infrastructure/auth-token/jwt-validation-service';
import { JwtModule } from '@nestjs/jwt';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: process.env.JWT_SECRET, 
          signOptions: { expiresIn: '60m' }
        }),
      ],
      controllers: [UsersController],
      providers: [
        {provide: IUsersRepository, useClass: MockUsersRepository},
        {provide: ITokenValidationService, useClass: JwtValidationService},
        {provide: IAuthService, useClass: AuthService},
        {provide: IUsersService, useClass: UsersService}
      ],
      exports: []
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
