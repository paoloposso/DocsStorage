import { Module } from '@nestjs/common';
import { UserDbSchema, UserSchema } from '../infrastructure/mongo/users.schema';
import { UsersController } from './users.controller';
import { IUsersRepository } from './users.repository';
import { UsersRepository } from '../infrastructure/mongo/users.repository';
import { IUsersService, UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService, IAuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
    controllers: [UsersController],
    providers: [
        {provide: IUsersRepository, useClass: UsersRepository},
        {provide: IAuthService, useClass: AuthService},
        {provide: IUsersService, useClass: UsersService},
    ],
    exports: [],
    imports: [
        MongooseModule.forFeature(
            [{ name: UserDbSchema.name, schema: UserSchema }]
        ),
        JwtModule.register({
            secret: process.env.JWT_SECRET ?? 'secret1234test'
        })
    ]
})
export class UsersModule {}
