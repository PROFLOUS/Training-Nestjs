import { Test, TestingModule } from '@nestjs/testing';
import { ClockingService } from './clocking.service';

describe('ClockingService', () => {
  let service: ClockingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClockingService],
    }).compile();

    service = module.get<ClockingService>(ClockingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
