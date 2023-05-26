import { Test, TestingModule } from '@nestjs/testing';
import { FilesService } from './files.service';
import { MockDbModule } from '../infrastructure/mock-db/mock-db.module';
import { IFilesRepository } from './files.repository';
import { FilesRepository } from '../infrastructure/mock-db/files-repository';

describe('FilesService', () => {
  let service: FilesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [MockDbModule],
      controllers: [],
      providers: [FilesService, 
        {provide: IFilesRepository, useClass: FilesRepository}
      ],
      exports: []
    }).compile();

    service = module.get<FilesService>(FilesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
