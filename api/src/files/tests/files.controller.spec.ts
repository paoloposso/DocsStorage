import { Test, TestingModule } from '@nestjs/testing';
import { FilesController } from '../files.controller';
import { FilesService } from '../files.service';
import { IFilesRepository } from '../files.repository';
import { MockFilesRepository } from '../../infrastructure/mock-db/files-repository';
import { MockDbModule } from '../../infrastructure/mock-db/mock-db.module';

describe('FilesController', () => {
  let controller: FilesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [MockDbModule],
      controllers: [FilesController],
      providers: [FilesService, 
        {provide: IFilesRepository, useClass: MockFilesRepository}
      ],
      exports: []
    }).compile();

    controller = new FilesController(module.get<FilesService>(FilesService));
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
