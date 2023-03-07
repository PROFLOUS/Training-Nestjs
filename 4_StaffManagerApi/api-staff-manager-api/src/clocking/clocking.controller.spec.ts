import { Test, TestingModule } from '@nestjs/testing';
import { ClockingController } from './clocking.controller';
import { ClockingService } from './clocking.service';

describe('ClockingController', () => {
  let controller: ClockingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClockingController],
      providers: [ClockingService],
    }).compile();

    controller = module.get<ClockingController>(ClockingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
