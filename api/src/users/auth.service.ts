import * as bcrypt from 'bcrypt';

export abstract class IAuthService {
    abstract hashPassword(password: string): Promise<[string, string]>;
}

export class AuthService 
{
    constructor() {}

    async hashPassword(password: string): Promise<[string, string]> {
        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(password, salt);
        
        return [salt, hashedPassword];
    }
}