import { Test, TestingModule } from '@nestjs/testing';
import { OfficeEquiqmentController } from './office-equiqment.controller';
import { OfficeEquiqmentService } from './office-equiqment.service';

describe('OfficeEquiqmentController', () => {
  let controller: OfficeEquiqmentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OfficeEquiqmentController],
      providers: [OfficeEquiqmentService],
    }).compile();

    controller = module.get<OfficeEquiqmentController>(OfficeEquiqmentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
