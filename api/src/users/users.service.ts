import { Injectable } from '@nestjs/common';
import { IUsersRepository } from './users.repository';
import { User } from './interfaces/user.interface';

@Injectable()
export class UsersService {
    constructor(private repository: IUsersRepository) {}

    async create(user: User): Promise<string> {
        return await this.repository.create(user);
    }

    async findByEmail(email: string): Promise<User> {
        return await this.repository.findByEmail(email);
    }
}
