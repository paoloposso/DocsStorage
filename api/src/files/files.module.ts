import { Module } from '@nestjs/common';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import { MockDbModule } from '../infrastructure/mock-db/mock-db.module';
import { IFilesRepository } from './files.repository';
import { FilesRepository } from 'src/infrastructure/mock-db/files-repository';

@Module({
    controllers: [FilesController],
    providers: [FilesService, 
        {provide: IFilesRepository, useClass: FilesRepository}],
    exports: [FilesService],
    imports: [MockDbModule]
})
export class FilesModule {}
