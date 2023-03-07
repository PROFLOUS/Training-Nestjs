import { IsDate, IsNotEmpty, IsString } from 'class-validator';
import { Types  } from 'mongoose';

export class CreateClockingDto {

    
    @IsNotEmpty()
    staffId: Types.ObjectId;

    @IsString()
    clockIn: string;
    @IsString()
    clockOut: string;
    @IsString()
    status: string;
    @IsDate()
    clockDate: Date;
}
