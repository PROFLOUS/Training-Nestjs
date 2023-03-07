import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";


export class CreateAuthDto {
    @ApiProperty({example: 'DangTan1s@Z0Ztech.io'})
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({example: '12345678'})
    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    password: string;
}
