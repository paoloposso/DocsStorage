import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Role } from './role';

export type UserDocument = UserDbSchema & Document;

@Schema()
export class UserDbSchema {
    @Prop()
    id: string;

    @Prop()
    email: string;

    @Prop()
    password: string;

    @Prop()
    role: Role;
}

export const UserSchema = SchemaFactory.createForClass(UserDbSchema);
