import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../users.controller';
import { MockDbModule } from '../../infrastructure/mock-db/mock-db.module';
import { IUsersRepository } from '../users.repository';
import { MockUsersRepository } from '../../infrastructure/mock-db/users-repository';
import { UsersService } from '../users.service';
import { FilesController } from 'src/files/files.controller';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [MockDbModule],
      controllers: [UsersController],
      providers: [UsersService, UsersController,
        {provide: IUsersRepository, useClass: MockUsersRepository}
      ],
      exports: []
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
