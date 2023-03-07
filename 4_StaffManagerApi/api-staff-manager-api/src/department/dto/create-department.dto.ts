import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ApiProperty ,ApiPropertyOptional} from '@nestjs/swagger';
export class CreateDepartmentDto {

    @ApiProperty({example: 'IT'})
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiPropertyOptional({example: 'IT Department'})
    @IsString()
    @IsOptional()
    description: string;

    @ApiProperty({example: 'Active'})
    @IsString()
    @IsNotEmpty()
    status: string;

    @ApiProperty({example: '63ec5dbef24979e1d483331a'})
    @IsString()
    @IsNotEmpty()
    managerId: string;
}
