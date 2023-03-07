import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ApiProperty ,ApiPropertyOptional} from '@nestjs/swagger';

export class ApproveDto {

    @ApiProperty({example: '63fda33c0dc621c1fdfed731'})
    @IsString()
    @IsNotEmpty()
    approverId: string;

    @ApiPropertyOptional({example: 'It is ok'})
    @IsString()
    @IsOptional()
    approverComment: string;

    @ApiProperty({example: 'Approved'})
    @IsString()
    @IsNotEmpty()
    status: string;


}