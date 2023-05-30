import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FilesModule } from './domain/files/files.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoModule } from './infrastructure/mongo/mongo.module';
import { UsersModule } from './domain/users/users.module';
import ITokenValidationService from './application/guards/token-validation-service';
import { JwtValidationService } from './infrastructure/auth-token/jwt-validation-service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI), 
    JwtModule.register({
      secret: process.env.JWT_SECRET, 
      signOptions: { expiresIn: '60m' }
    }),
    FilesModule, UsersModule, 
    MongoModule, JwtModule
  ],
  controllers: [AppController],
  providers: [AppService,
    // {provide: IUsersRepository, useClass: UsersRepository},
    {provide: ITokenValidationService, useClass: JwtValidationService},
  ],
  exports: []
})
export class AppModule {}
