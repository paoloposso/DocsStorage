import * as bcrypt from 'bcrypt';
import { IUsersRepository } from './users.repository';
import { Injectable, NotFoundException } from '@nestjs/common';

export abstract class IAuthService {
    abstract hashPassword(password: string): Promise<[string, string]>;
    abstract authenticateUser(
        { email, plainTextPassword }: { email: string; plainTextPassword: string; }): Promise<string>;
}

@Injectable()
export class AuthService implements IAuthService
{
    constructor(private repository: IUsersRepository) {}

    async hashPassword(password: string): Promise<[string, string]> {
        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(password, salt);
        
        return [salt, hashedPassword];
    }

    async authenticateUser(
        { email, plainTextPassword }: { email: string; plainTextPassword: string; }): Promise<string> {
        const user = await this.repository.findByEmail(email);

        if (!user) {
            throw new NotFoundException('User not found');
        }

        if (this.comparePasswords(plainTextPassword, user.password)) {
            return 'token123121';
        }

        throw new NotFoundException('User not found');
    }

    private async comparePasswords(password: string, storedPassword: string): Promise<boolean> {
        const isMatch = await bcrypt.compare(password, storedPassword);

        return isMatch;
    }
}