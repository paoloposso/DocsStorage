export abstract class IUsersRepository {
    abstract create(user: any): Promise<string>;
    abstract findByEmail(email: string): Promise<any>;
}