import { Module } from '@nestjs/common';
import { MockFilesRepository } from './files-repository';

@Module({
    imports: [],
    controllers: [],
    providers: [MockFilesRepository],
    exports: [MockFilesRepository]
})
export class MockDbModule {}