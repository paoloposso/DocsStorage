import { User } from "./interfaces/user.interface";

export abstract class IUsersRepository {
    abstract create(user: User): Promise<string>;
    abstract findByEmail(email: string): Promise<User>;
}