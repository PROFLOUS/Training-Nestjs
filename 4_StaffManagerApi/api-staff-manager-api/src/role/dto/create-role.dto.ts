import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateRoleDto {
    @ApiProperty({example: 'Leve 2'})
    @IsString()
    @IsNotEmpty()
    nameRole: string;

    @ApiPropertyOptional({example: 'Can create, update, delete'})
    @IsString()
    @IsOptional()
    description: string;
}
