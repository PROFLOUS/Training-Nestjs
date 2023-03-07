import { Module } from '@nestjs/common';
import { OfficeEquiqmentService } from './office-equiqment.service';
import { OfficeEquiqmentController } from './office-equiqment.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { OfficeEquiqmentSchema } from './schemas/office-equiqment.entity';
import { StaffModule } from 'src/staff/staff.module';
import { OfficeEquiqmentForStaffModule } from 'src/office-equiqment-for-staff/office-equiqment-for-staff.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'OfficeEquiqment', schema: OfficeEquiqmentSchema }]),
    StaffModule,
    OfficeEquiqmentForStaffModule
  ],
  controllers: [OfficeEquiqmentController],
  providers: [OfficeEquiqmentService]
})
export class OfficeEquiqmentModule {}
