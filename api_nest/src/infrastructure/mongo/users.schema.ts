import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Role } from '../../domain/users/role.enum';

export type UserDocument = UserDbSchema & Document;

@Schema()
export class UserDbSchema {
    @Prop()
    id: string;

    @Prop({ unique: true })
    email: string;

    @Prop()
    passwordHash: string;
    
    @Prop()
    role: Role;
}

export const UserSchema = SchemaFactory.createForClass(UserDbSchema);
