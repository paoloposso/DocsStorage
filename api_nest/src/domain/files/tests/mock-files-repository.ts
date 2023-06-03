import { Injectable } from "@nestjs/common";
import { FileMetadata } from "src/domain/files/interfaces/file-metadata.interface";
import { IFilesRepository } from "src/domain/files/files.repository";

@Injectable()
export class MockFilesRepository implements IFilesRepository {
    getFilesList(): Promise<FileMetadata[]> {
        return Promise.resolve([
            {
                id: "1",
                name: "file1",
                description: "file1 description",
                path: "path/to/file1",
                createdBy: "1"
            }
        ]);
    }

    getFileById(id: string): Promise<FileMetadata> {
        return Promise.resolve({
            id: "1",
            name: "file1",
            description: "file1 description",
            path: "path/to/file1",
            createdBy: "1"
        });
    }

    createFile(file: FileMetadata): Promise<string> {
        return Promise.resolve(Math.random().toString());
    }
}
