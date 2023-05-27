import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../users.controller';
import { IUsersRepository } from '../users.repository';
import { MockUsersRepository } from './mock-users-repository';
import { UsersService } from '../users.service';
import { FilesController } from 'src/files/files.controller';
import { AuthService, IAuthService } from '../auth.service';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [UsersController],
      providers: [UsersService, UsersController,
        {provide: IUsersRepository, useClass: MockUsersRepository},
        {provide: IAuthService, useClass: AuthService}
      ],
      exports: []
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
