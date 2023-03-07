import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";


export class ChangePasswordDto {
    @ApiProperty({example: 'DangTan1s@Z0Ztech.io'})
    @IsString()
    @IsNotEmpty()
    email: string;

    @ApiProperty({example: 'pB^DHBEWpF'})
    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    password: string;

    @ApiProperty({example: '1234567'})
    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    newPassword: string;

}
