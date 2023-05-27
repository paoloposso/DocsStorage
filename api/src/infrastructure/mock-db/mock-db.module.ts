import { Module } from '@nestjs/common';
import { FilesRepository } from './files-repository';

@Module({
    imports: [],
    controllers: [],
    providers: [FilesRepository],
    exports: [FilesRepository]
})
export class MockDbModule {}