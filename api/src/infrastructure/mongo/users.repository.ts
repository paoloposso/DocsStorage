import { Injectable } from "@nestjs/common";
import { UserDbSchema, UserDocument } from "./users.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "../../users/interfaces/user.interface";

@Injectable()
export class UsersRepository {
    constructor(
        @InjectModel(UserDbSchema.name) private userModel: Model<UserDocument>) {}

    async create(user: UserDbSchema): Promise<string> {
        const createdUser = new this.userModel(user);
        let saved = await createdUser.save();

        return saved._id.toString();
    }

    async findByEmail(email: string): Promise<UserDbSchema | undefined> {
        const user = await this.userModel
                    .findOne({ email: email })
                    .exec();

        if (!user) {
            return undefined;
        }

        return {
            id: user._id.toString(),
            email: user.email,
            password: user.password,
            role: user.role,
        };
    }
}

