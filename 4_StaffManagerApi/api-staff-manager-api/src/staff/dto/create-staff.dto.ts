import { ApiProperty ,ApiPropertyOptional} from '@nestjs/swagger';

import { IsNumber, IsString } from 'class-validator';
import { IsDate, IsEmail, IsNotEmpty, IsOptional, MinLength,ValidateIf } from 'class-validator';
import { Types  } from 'mongoose';

export class CreateStaffDto{

    @ApiProperty({example: 'Nguyen Van A'})
    @IsString()
    @IsNotEmpty()   
    name: string;

    @ApiProperty({example: '1999-12-31'})
    @IsNotEmpty()
    dob: Date;
    
    start_date: Date;


    @ApiProperty({example: 'BE Developer'})
    @IsString()
    @IsNotEmpty()
    position: string;

    @ApiProperty({example: '0943220476'})
    @IsString()
    @IsNotEmpty()
    @MinLength(10)
    phone: string;

    password: string;

    @ApiProperty({example: 'dang@gmail.com'})
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    emailCompany: string;

    isActived: boolean;

    @ApiPropertyOptional({example: ''})
    @IsString()
    @IsOptional()
    image: string;

    @ApiPropertyOptional({example: 'Hanoi'})
    @IsString()
    @IsOptional()
    address: string;

    @ApiProperty({example: '1'})
    @IsNumber()
    @IsNotEmpty()
    level: number;

    max_absence: number;

    @ApiPropertyOptional({example: '63fd9dd073b7c2ef748e234b'})
    @IsOptional()
    departmentId: Types.ObjectId;

    @ValidateIf(o => o.level < 3)
    @ApiProperty({example: '63eafc0423db5ee55ec0a64d'})
    @IsString()
    @IsNotEmpty()
    managerId: Types.ObjectId;

    @ApiPropertyOptional({example: '63ec4152838341307ab0aa79'})
    @IsString()
    @IsOptional()
    roleId:Types.ObjectId;
}