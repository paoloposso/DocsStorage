import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FilesController } from './files/files.controller';
import { MockDbModule } from './infrastructure/mock-db/mock-db.module';
import { FilesModule } from './files/files.module';

@Module({
  imports: [MockDbModule, FilesModule],
  controllers: [AppController, FilesController],
  providers: [AppService],
  exports: []
})
export class AppModule {}
