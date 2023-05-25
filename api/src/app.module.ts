import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FilesController } from './files/files.controller';
import { FilesService } from './files/files.service';
import { FilesRepository as AbstractFilesRepository } from './files/files.repository';
import { FilesRepository } from './infrastructure/mock-db/files-repository';

@Module({
  imports: [],
  controllers: [AppController, FilesController],
  providers: [AppService, FilesService, 
    {provide: AbstractFilesRepository, useClass: FilesRepository}
  ],
  exports: []
})
export class AppModule {}
