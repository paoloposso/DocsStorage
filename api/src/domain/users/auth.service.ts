import * as bcrypt from 'bcryptjs';
import { IUsersRepository } from './users.repository';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from './interfaces/user.interface';

export abstract class IAuthService {
    abstract hashPassword(password: string): Promise<string>;
    abstract authenticateUser(
        { email, plainTextPassword }: { email: string; plainTextPassword: string; }): Promise<string>;
}

@Injectable()
export class AuthService implements IAuthService
{
    constructor(private readonly jwtService: JwtService, 
                private readonly repository: IUsersRepository) {}

    async hashPassword(password: string): Promise<string> {
        const hashedPassword = await bcrypt.hashSync(password, 10);
        
        return hashedPassword;
    }

    private async comparePasswords(password: string, storedPassword: string): Promise<boolean> {
        const isMatch = await bcrypt.compare(password, storedPassword);

        return isMatch;
    }

    async authenticateUser(
        { email, plainTextPassword }: { email: string; plainTextPassword: string; }) : Promise<string> {
        
        const user: User = await this.repository.findByEmail(email);
    
        if (user && this.comparePasswords(plainTextPassword, user.password)) {
            const payload = { 
                username: user.email, sub: user.id, iss: 'docs', role: user.role };
    
            const token = this.jwtService.sign(payload);
    
            return token;
        }
    
        return null;
    }
}