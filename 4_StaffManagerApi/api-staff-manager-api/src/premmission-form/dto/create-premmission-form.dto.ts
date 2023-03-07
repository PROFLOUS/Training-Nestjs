import { IsNotEmpty, IsOptional, IsString, ValidateIf } from "class-validator";
import { ApiProperty ,ApiPropertyOptional} from '@nestjs/swagger';

export class CreatePremmissionFormDto {

    @ApiProperty({example: '63fda33c0dc621c1fdfed731'})
    @IsString()
    @IsNotEmpty()
    staffId: string;

    @ApiProperty({example: '2023-03-01'})
    @IsString()
    @IsNotEmpty()
    startDate: string;

    @ApiPropertyOptional({example: ''})
    @IsString()
    @IsOptional()
    endDate: string;

    @ApiProperty({example: 'I want to go to my hometown'})
    @IsString()
    @IsNotEmpty()
    reason: string;

    @ApiProperty({example: 'Annual Leave'})
    @IsString()
    @IsNotEmpty()
    type: string;

    @ApiProperty({example: '63fda08cf1b9242e36378fd2'})
    @IsString()
    @IsNotEmpty()
    approverId: string;


    @ValidateIf(o => o.type === 'Sick Leave')
    @ApiProperty({example: 'https://images.unsplash.com/photo-1579444741963-5ae219cfe27c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'})
    @IsString()
    @IsNotEmpty()
    image: string;
}
