import { FileMetadata } from "./file-metadata";

export abstract class FilesRepository {
    abstract getFilesList(): Promise<FileMetadata[]>;
    abstract getFileById(id: string): Promise<FileMetadata>;
    abstract createFile(file: FileMetadata): Promise<string>;
    // abstract updateFile(file: string): string;
    // abstract deleteFile(id: string): string;
}
