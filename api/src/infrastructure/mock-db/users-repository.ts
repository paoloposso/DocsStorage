import { Injectable } from "@nestjs/common";
import { User } from "src/users/interfaces/user.interface";
import { IUsersRepository } from "src/users/users.repository";

@Injectable()
export class MockUsersRepository implements IUsersRepository {
    async create(user: any): Promise<string> {
        return "1234";
    }

    async findByEmail(email: string): Promise<User | undefined> {
        if (email === "test@gmail.com") {
            return {
                id: "1",
                email: "",
                password: "",
                role: 1,
            };
        }

        return undefined;
    }
}