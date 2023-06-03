import { Module } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { UserDbSchema, UserSchema } from './users.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: UserDbSchema.name, schema: UserSchema }])],
    providers: [UsersRepository],
    exports: [UsersRepository]
})
export class MongoModule {}
