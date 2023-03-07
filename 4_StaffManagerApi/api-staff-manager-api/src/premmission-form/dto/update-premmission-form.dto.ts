import { PartialType } from '@nestjs/swagger';
import { CreatePremmissionFormDto } from './create-premmission-form.dto';

export class UpdatePremmissionFormDto extends PartialType(CreatePremmissionFormDto) {}
