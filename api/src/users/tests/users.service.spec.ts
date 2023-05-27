import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users.service';
import { MockDbModule } from '../../infrastructure/mock-db/mock-db.module';
import { UsersController } from '../users.controller';
import { IUsersRepository } from '../users.repository';
import { MockUsersRepository } from '../../infrastructure/mock-db/users-repository';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
        imports: [MockDbModule],
        controllers: [],
        providers: [UsersService,
          {provide: IUsersRepository, useClass: MockUsersRepository}
        ],
        exports: []
      }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
