import { Injectable } from "@nestjs/common";
import { UserDbSchema, UserDocument } from "./users.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "../../users/interfaces/user.interface";
import { IUsersRepository } from "src/users/users.repository";

@Injectable()
export class UsersRepository implements IUsersRepository {
    constructor(
        @InjectModel(UserDbSchema.name) private userModel: Model<UserDocument>) {}

    async create(user: User, salt: string): Promise<string> {
        const createdUser = new this.userModel({
            email: user.email,
            passwordHash: user.password,
            passwordSalt: salt,
            role: user.role,
        });

        let saved = await createdUser.save();

        return saved._id.toString();
    }

    async findByEmail(email: string): Promise<User | undefined> {
        const user = await this.userModel
                    .findOne({ email: email })
                    .exec();

        if (!user) {
            return undefined;
        }

        return {
            id: user._id.toString(),
            email: user.email,
            password: '',
            role: user.role,
        };
    }
}

