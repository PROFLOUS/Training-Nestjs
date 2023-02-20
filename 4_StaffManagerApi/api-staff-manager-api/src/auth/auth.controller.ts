import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { CreateStaffDto } from '../staff/dto/create-staff.dto';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';

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

  @Post('send-otp')
  @UseGuards(AccessTokenGuard) 
  sendOtp(@Body() data: any) {
    return this.authService.sendOtp(data.email, data.id, data.phone);
  }

  @Post('refresh-token')
  refreshToken(@Body() data: any) {
    return this.authService.refreshToken(data);
  }

  @Patch('rest-password/:id')
  forgotPassword(@Param('id') id: string, @Body() data: any) {
    return this.authService.restPassword(id,data);
  }

  @Patch('change-password/:id')
  changePassword(@Param('id') id: string, @Body() data: any) {
    return this.authService.changePassword(id,data);
  }



  
}
