import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FilesModule } from './files/files.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoModule } from './infrastructure/mongo/mongo.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    FilesModule, 
    MongooseModule.forRoot(process.env.MONGO_URI), 
    UsersModule, 
    MongoModule
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: []
})
export class AppModule {}
