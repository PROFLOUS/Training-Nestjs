import { Module } from '@nestjs/common';
import { OfficeEquiqmentForStaffService } from './office-equiqment-for-staff.service';
import { OfficeEquiqmentForStaffController } from './office-equiqment-for-staff.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { OfficeEquiqmentForStaffSchema } from './schemas/office-equiqment-for-staff.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'OfficeEquiqmentForStaff', schema: OfficeEquiqmentForStaffSchema }]),
  ],
  controllers: [OfficeEquiqmentForStaffController],
  providers: [OfficeEquiqmentForStaffService],
  exports: [OfficeEquiqmentForStaffService]
})
export class OfficeEquiqmentForStaffModule {}
