import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { CreateStaffDto } from '../staff/dto/create-staff.dto';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { ApiTags } from '@nestjs/swagger';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger/dist';
import { ChangePasswordDto } from './dto/change-password';
import { RefreshTokenDto } from './dto/refresh-token';

@ApiTags('auth')
@Controller('auth')

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  signUp(@Body() createAuthDto: CreateStaffDto) {
    return this.authService.signUp(createAuthDto);
  }

  @Post('sign-in')
  // @UseGuards(AccessTokenGuard)
  // @ApiBearerAuth('jwt')
  
  signIn(@Body() data: CreateAuthDto) {
    return this.authService.signIn(data);
  }

  @Post('refresh-token/:id')
  @ApiBody({type: RefreshTokenDto})
  refreshToken( @Param('id') staffId:string, @Body() data: any) {
    return this.authService.refreshToken(staffId,data);
  }

  @Patch('rest-password/:id')
  forgotPassword(@Param('id') id: string, @Body() data: any) {
    return this.authService.restPassword(id,data);
  }

  @Patch('change-password/:id')
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth('jwt')
  @ApiBody({type: ChangePasswordDto})
  changePassword(@Param('id') id: string, @Body() data: any) {
    return this.authService.changePassword(id,data);
  }
 
}
