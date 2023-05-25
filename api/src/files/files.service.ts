import { Injectable } from '@nestjs/common';
import { FilesRepository as IFilesRepository } from './files.repository';
import { FileMetadata } from './file-metadata';

@Injectable()
export class FilesService {
    constructor(private repository: IFilesRepository) {}

    getFilesList(): Promise<FileMetadata[]> {
        return this.repository.getFilesList();
    }
}
