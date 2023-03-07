
import { PartialType } from '@nestjs/swagger/dist';
import { CreateRoleDto } from './create-role.dto';

export class UpdateRoleDto extends PartialType(CreateRoleDto) {}
