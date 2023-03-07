import { Test, TestingModule } from '@nestjs/testing';
import { PremmissionFormController } from './premmission-form.controller';
import { PremmissionFormService } from './premmission-form.service';

describe('PremmissionFormController', () => {
  let controller: PremmissionFormController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PremmissionFormController],
      providers: [PremmissionFormService],
    }).compile();

    controller = module.get<PremmissionFormController>(PremmissionFormController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
