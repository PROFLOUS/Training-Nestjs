import { ApiProperty ,ApiPropertyOptional} from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { Types  } from 'mongoose';

export class CreateOfficeEquiqmentForStaffDto {
    @ApiProperty({example: '63fda08cf1b9242e36378fd2'})
    @IsString()
    @IsNotEmpty()   
    oEId: Types.ObjectId;

    @ApiProperty({example: '63fda33c0dc621c1fdfed731'})
    @IsString()
    @IsNotEmpty()
    staffId: Types.ObjectId;

    @ApiProperty({example: '1'})
    @IsNotEmpty()
    @IsNumber()
    qty: number;
    
    @ApiPropertyOptional({example: '2021-07-01'})
    @IsOptional()
    returnedDate: Date;
    
    @ApiProperty({example: 'In use'})
    @IsString()
    status: string;
}
