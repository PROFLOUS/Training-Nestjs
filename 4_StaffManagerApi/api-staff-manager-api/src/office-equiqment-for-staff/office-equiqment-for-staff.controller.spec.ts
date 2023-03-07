import { Test, TestingModule } from '@nestjs/testing';
import { OfficeEquiqmentForStaffController } from './office-equiqment-for-staff.controller';
import { OfficeEquiqmentForStaffService } from './office-equiqment-for-staff.service';

describe('OfficeEquiqmentForStaffController', () => {
  let controller: OfficeEquiqmentForStaffController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OfficeEquiqmentForStaffController],
      providers: [OfficeEquiqmentForStaffService],
    }).compile();

    controller = module.get<OfficeEquiqmentForStaffController>(OfficeEquiqmentForStaffController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
