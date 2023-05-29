import { Injectable } from '@nestjs/common';
import { IUsersRepository } from './users.repository';
import { User } from './interfaces/user.interface';
import { AuthService, IAuthService } from './auth.service';

export abstract class IUsersService {
    abstract create(user: User): Promise<string>;
    abstract findByEmail(email: string): Promise<User>;
}

@Injectable()
export class UsersService implements IUsersService {
    constructor(
        private repository: IUsersRepository, 
        private authService: IAuthService) {}

    async create(user: User): Promise<string> {
        let [salt, hashedPassword] = await this.authService.hashPassword(user.password);
        user.password = hashedPassword;
        return await this.repository.create(user, salt);
    }

    async findByEmail(email: string): Promise<User> {
        return await this.repository.findByEmail(email);
    }
}
