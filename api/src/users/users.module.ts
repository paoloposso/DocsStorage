import { Module } from '@nestjs/common';
import { UserDbSchema, UserSchema } from '../infrastructure/mongo/users.schema';
import { UsersController } from './users.controller';
import { IUsersRepository } from './users.repository';
import { UsersRepository } from '../infrastructure/mongo/users.repository';
import { UsersService } from './users.service';
import { MockDbModule } from '../infrastructure/mock-db/mock-db.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService, IAuthService } from './auth.service';

@Module({
    controllers: [UsersController],
    providers: [UsersService, 
        {provide: IUsersRepository, useClass: UsersRepository},
        {provide: IAuthService, useClass: AuthService}
    ],
    exports: [UsersService],
    imports: [MockDbModule, 
        MongooseModule.forFeature([{ name: UserDbSchema.name, schema: UserSchema }])
    ]
})
export class UsersModule {}
