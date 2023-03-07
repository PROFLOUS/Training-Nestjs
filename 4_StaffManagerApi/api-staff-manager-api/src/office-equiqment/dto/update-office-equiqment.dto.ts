
import { PartialType } from '@nestjs/swagger';
import { CreateOfficeEquiqmentDto } from './create-office-equiqment.dto';

export class UpdateOfficeEquiqmentDto extends PartialType(CreateOfficeEquiqmentDto) {}
