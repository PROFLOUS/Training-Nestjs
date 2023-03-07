import { Module } from '@nestjs/common';
import { ClockingService } from './clocking.service';
import { ClockingController } from './clocking.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Clocking, ClockingSchema } from './schemas/clocking.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Clocking.name, schema: ClockingSchema }]),
  ],
  controllers: [ClockingController],
  providers: [ClockingService]
})
export class ClockingModule {}
