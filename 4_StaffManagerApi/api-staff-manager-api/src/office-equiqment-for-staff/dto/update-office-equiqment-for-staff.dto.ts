
import { PartialType } from '@nestjs/swagger';
import { CreateOfficeEquiqmentForStaffDto } from './create-office-equiqment-for-staff.dto';

export class UpdateOfficeEquiqmentForStaffDto extends PartialType(CreateOfficeEquiqmentForStaffDto) {}
