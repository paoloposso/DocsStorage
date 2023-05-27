import { Module } from '@nestjs/common';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import { IFilesRepository } from './files.repository';
import { MockFilesRepository } from './tests/mock-files-repository';

@Module({
    controllers: [FilesController],
    providers: [FilesService, 
        {provide: IFilesRepository, useClass: MockFilesRepository}],
    exports: [FilesService],
    imports: []
})
export class FilesModule {}
