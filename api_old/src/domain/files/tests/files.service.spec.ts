import { Test, TestingModule } from '@nestjs/testing';
import { FilesService } from '../files.service';
import { IFilesRepository } from '../files.repository';
import { MockFilesRepository } from './mock-files-repository';

describe('FilesService', () => {
  let service: FilesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [],
      providers: [FilesService, 
        {provide: IFilesRepository, useClass: MockFilesRepository}
      ],
      exports: []
    }).compile();

    service = module.get<FilesService>(FilesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
