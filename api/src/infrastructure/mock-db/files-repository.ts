import { Injectable } from "@nestjs/common";
import { FileMetadata } from "src/files/file-metadata";
import { FilesRepository as AbstractFilesRepository } from "src/files/files.repository";

@Injectable()
export class FilesRepository implements AbstractFilesRepository {
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
