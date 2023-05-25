import { Controller, Get } from '@nestjs/common';
import { FilesService } from './files.service';
import { FileMetadata } from './file-metadata';

@Controller('files')
export class FilesController {
    constructor(private readonly service: FilesService) {}

    @Get()
    public getHello(): Promise<FileMetadata[]> {
        return this.service.getFilesList();
    }
}
