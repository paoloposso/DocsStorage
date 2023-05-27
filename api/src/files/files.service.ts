import { Injectable } from '@nestjs/common';
import { IFilesRepository } from './files.repository';
import { FileMetadata } from './interfaces/file-metadata.interface';

@Injectable()
export class FilesService {
    constructor(private repository: IFilesRepository) {}

    getFilesList(): Promise<FileMetadata[]> {
        return this.repository.getFilesList();
    }
}
