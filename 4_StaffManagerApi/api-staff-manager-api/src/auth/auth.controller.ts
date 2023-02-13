import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { CreateStaffDto } from '../staff/dto/create-staff.dto';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  signUp(@Body() createAuthDto: CreateStaffDto) {
    return this.authService.signUp(createAuthDto);
  }

  @Post('sign-in')
  signIn(@Body() data: CreateAuthDto) {
    return this.authService.signIn(data);
  }

  @Post('verify-otp')
  verifyOtp(@Body() data: any) {
    return this.authService.activeAccount(data);
  }


  
}
