import { ApiProperty ,ApiPropertyOptional} from '@nestjs/swagger';

import { IsNumber, IsString } from 'class-validator';
import { IsDate, IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';
import { Types  } from 'mongoose';

export class CreateOfficeEquiqmentDto {

    @ApiProperty({example: 'Laptop Dell'})
    @IsString()
    @IsNotEmpty()   
    name: string;

    @ApiProperty({example: '10'})
    @IsNotEmpty()
    @IsNumber()
    quantity: number;
    
    @ApiPropertyOptional({example: 'https://laptopvang.com/wp-content/uploads/2022/04/laptop-xps-9520-2022-black-laptopvang4-768x768.png'})
    @IsString()
    @IsOptional()
    image: string;
    
    @ApiProperty({example: 'Laptop for developer'})
    @IsString()
    @IsNotEmpty()
    description: string;

}
