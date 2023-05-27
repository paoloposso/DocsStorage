import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../users.controller';
import { IUsersRepository } from '../users.repository';
import { MockUsersRepository } from './mock-users-repository';
import { IUsersService, UsersService } from '../users.service';
import { AuthService, IAuthService } from '../auth.service';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [UsersController],
      providers: [
        {provide: IUsersRepository, useClass: MockUsersRepository},
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
