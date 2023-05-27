import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MockDbModule } from './infrastructure/mock-db/mock-db.module';
import { FilesModule } from './files/files.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoModule } from './infrastructure/mongo/mongo.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    MockDbModule, FilesModule, 
    MongooseModule.forRoot('mongodb://localhost:27017/docs'), 
    UsersModule, 
    MongoModule
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: []
})
export class AppModule {}
