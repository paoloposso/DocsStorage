import { Module } from '@nestjs/common';
import { UserDbSchema, UserSchema } from 'src/infrastructure/mongo/users.schema';
import { UsersController } from './users.controller';
import { IUsersRepository } from './users.repository';
import { UsersRepository } from '../infrastructure/mongo/users.repository';
import { UsersService } from './users.service';
import { MockDbModule } from 'src/infrastructure/mock-db/mock-db.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    controllers: [UsersController],
    providers: [UsersService, 
        {provide: IUsersRepository, useClass: UsersRepository}],
    exports: [UsersService],
    imports: [MockDbModule, 
        MongooseModule.forFeature([{ name: UserDbSchema.name, schema: UserSchema }])
    ]
})
export class UsersModule {}
