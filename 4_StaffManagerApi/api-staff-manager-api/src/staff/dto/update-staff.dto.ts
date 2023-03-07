
import { PartialType } from '@nestjs/swagger';
import { OmitType } from '@nestjs/swagger';
import { CreateStaffDto } from './create-staff.dto';

export class UpdateStaffDto extends PartialType
(
    OmitType(CreateStaffDto, [
        'start_date','position','emailCompany',
        'isActived','level','max_absence','departmentId',
        'managerId','roleId'
    ] as const)
) {}