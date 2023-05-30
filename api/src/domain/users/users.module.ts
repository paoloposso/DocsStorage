import { Module } from '@nestjs/common';
import { UserDbSchema, UserSchema } from '../../infrastructure/mongo/users.schema';
import { UsersController } from './users.controller';
import { IUsersService, UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService, IAuthService } from './auth.service';
import ITokenValidationService from 'src/application/guards/token-validation-service';
import { JwtValidationService } from 'src/infrastructure/auth-token/jwt-validation-service';
import { JwtModule } from '@nestjs/jwt';
import { IUsersRepository } from './users.repository';
import { UsersRepository } from 'src/infrastructure/mongo/users.repository';

@Module({
    controllers: [UsersController],
    providers: [
        {provide: IAuthService, useClass: AuthService},
        {provide: IUsersService, useClass: UsersService},
        {provide: IUsersRepository, useClass: UsersRepository},
        {provide: ITokenValidationService, useClass: JwtValidationService},
    ],
    exports: [],
    imports: [
        JwtModule.register({
            secret: process.env.JWT_SECRET, 
            signOptions: { expiresIn: '60m' }
          }),
        MongooseModule.forFeature([{ name: UserDbSchema.name, schema: UserSchema }]
        )
    ]
})
export class UsersModule {}
