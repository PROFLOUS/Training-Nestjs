import { BadRequestException, CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { StaffService } from 'src/staff/staff.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as argon2 from 'argon2';
import { CreateStaffDto } from '../../src/staff/dto/create-staff.dto';
import { Cache } from 'cache-manager';

@Injectable()
export class AuthService {
  constructor(
    private staffService: StaffService,
    private jwtService: JwtService,
    private configService: ConfigService,
    @Inject(CACHE_MANAGER) private cacheService: Cache,
  ) {}

  async signUp(createAuthDto: CreateStaffDto):Promise<any> {
    const staffExists = await this.staffService.findByEmail(
      createAuthDto.email,
    );

    if (staffExists) {
      throw new BadRequestException('Staff already exists');
    }

    const hashedPassword = await argon2.hash(createAuthDto.password);
    const isActived = false;
    const newStaff = await this.staffService.create({...createAuthDto, password: hashedPassword,isActived});
    const rs = await this.sendOtp(newStaff.email, newStaff.id,newStaff.phone);
    return {
      staff: newStaff.id,
      isActived: newStaff.isActived,
      message: rs,
    }

  }

  async signIn(data: CreateAuthDto):Promise<any> {
    const staffExists = await this.staffService.findByEmail(data.email);
    if (!staffExists) {
      throw new BadRequestException('Staff does not exist');
    }
    if(!staffExists.isActived){
      throw new BadRequestException('Staff is not actived');
    }

    const isPasswordValid = await argon2.verify(
      staffExists.password,
      data.password,
    );

    if (!isPasswordValid) {
      throw new BadRequestException('Password is not valid');
    }

    const token = await this.generateToken(staffExists.id,staffExists.email);
    const { refreshToken } = token;
    
    await this.cacheService.set(staffExists.id, refreshToken, 0);

    return {
      staff: staffExists.id,
      isActived: staffExists.isActived,
      ...token,
    };
  }

  async generateToken(staffId: string,email:string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        { id: staffId,email },
        {
          secret: this.configService.get<string>('AWS_ACCESS_KEY_ID'),
          expiresIn: this.configService.get<string>('ACCESS_TOKEN_LIFE'),
        }
      ),
      this.jwtService.signAsync(
        { id: staffId,email },
        {
          secret: this.configService.get<string>('REFRESH_TOKEN_SECRET'),
          expiresIn: this.configService.get<string>('REFRESH_TOKEN_LIFE'),
        }
      ),  

    ]);

    return { accessToken, refreshToken };
  }

  async sendOtp(email,staffId: string,phone) {

    const staffExists = await this.staffService.findByEmail(email);
    if (!staffExists) {
      throw new BadRequestException('Staff does not exist');
    }
    const otp = await this.generateOtp();
    console.log(otp);
    await this.cacheService.set(staffId+'otp', otp);
    return 'Please check your phone to active your account, is expired in 1 min';
  }

  async activeAccount(data) {
    const {staffId,otp} = data;
    const staffExists = await this.staffService.findById(staffId);
    if (!staffExists) {
      throw new BadRequestException('Staff does not exist');
    }
    const otpCache = await this.cacheService.get(staffId+'otp');
    console.log(otpCache);
    if(!otpCache){
      throw new BadRequestException('OTP is expired');
    }
    if(otpCache != otp){
      throw new BadRequestException('OTP is not valid');
    }
    const isActived = true;

    const newStaff = await this.staffService.update(staffId, {isActived});

    return {
      staff: newStaff.id,
      isActived: newStaff.isActived,
      message: 'Active account success',
    }

  }

  async generateOtp() {
    let otp = '';
    for (let i = 0; i < 6; i++) {
        otp += Math.floor(Math.random() * 10);
    }
    return otp;
  }
}
