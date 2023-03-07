import { Test, TestingModule } from '@nestjs/testing';
import { PremmissionFormService } from './premmission-form.service';

describe('PremmissionFormService', () => {
  let service: PremmissionFormService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PremmissionFormService],
    }).compile();

    service = module.get<PremmissionFormService>(PremmissionFormService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
