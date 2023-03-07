import { Test, TestingModule } from '@nestjs/testing';
import { OfficeEquiqmentService } from './office-equiqment.service';

describe('OfficeEquiqmentService', () => {
  let service: OfficeEquiqmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OfficeEquiqmentService],
    }).compile();

    service = module.get<OfficeEquiqmentService>(OfficeEquiqmentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
