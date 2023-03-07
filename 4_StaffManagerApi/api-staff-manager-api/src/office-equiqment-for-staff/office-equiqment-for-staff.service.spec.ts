import { Test, TestingModule } from '@nestjs/testing';
import { OfficeEquiqmentForStaffService } from './office-equiqment-for-staff.service';

describe('OfficeEquiqmentForStaffService', () => {
  let service: OfficeEquiqmentForStaffService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OfficeEquiqmentForStaffService],
    }).compile();

    service = module.get<OfficeEquiqmentForStaffService>(OfficeEquiqmentForStaffService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
