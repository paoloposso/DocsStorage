import { Test, TestingModule } from '@nestjs/testing';
import { IUsersService, UsersService } from '../users.service';
import { IUsersRepository } from '../users.repository';
import { AuthService, IAuthService } from '../auth.service';
import { MockUsersRepository } from './mock-users-repository';
import { User } from 'src/domain/users/interfaces/user.interface';
import { JwtModule } from '@nestjs/jwt';

describe('UsersService', () => {
    let service: UsersService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                JwtModule.register({
                    secret: process.env.JWT_SECRET, 
                    signOptions: { expiresIn: '60m' }
                  }),
            ],
            controllers: [],
            providers: [UsersService,
                {provide: IUsersRepository, useClass: MockUsersRepository},
                {provide: IAuthService, useClass: AuthService}
            ],
            exports: []
        }).compile();

        service = module.get<UsersService>(UsersService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should create a user', async () => {
        let user: User = {
            email: 'test@gmail.com',
            password: 'test1234',
            role: 1,
            id: undefined
        };

        let result = await service.create(user);

        expect(result).toBeDefined();
        expect(result).toEqual('1234');
    });
});
