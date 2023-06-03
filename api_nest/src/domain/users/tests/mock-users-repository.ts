import { Injectable } from "@nestjs/common";
import { User } from "src/domain/users/interfaces/user.interface";
import { IUsersRepository } from "src/domain/users/users.repository";

@Injectable()
export class MockUsersRepository implements IUsersRepository {
    async create(user: User): Promise<string> {
        if (user.email === "test@gmail.com") {
            return "1234";
        }
        throw new Error("InvalidParameters");
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