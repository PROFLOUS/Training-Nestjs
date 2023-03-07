import { BadRequestException, CACHE_MANAGER, ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { StaffService } from 'src/staff/staff.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as argon2 from 'argon2';
import { CreateStaffDto } from '../../src/staff/dto/create-staff.dto';
import { Cache } from 'cache-manager'
import { generate } from 'generate-password';
import { MailService } from 'src/mail/mail.service';
import { Types } from 'mongoose';



@Injectable()
export class AuthService {
  constructor(
    private staffService: StaffService,
    private jwtService: JwtService,
    private configService: ConfigService,
    @Inject(CACHE_MANAGER) private cacheService: Cache,
    private mailService: MailService,
  ) {}

  async signUp(createAuthDto: CreateStaffDto):Promise<any> {
    const staffExists = await this.staffService.findByEmail(
      createAuthDto.email,
    );


    if(createAuthDto.managerId){
      const manager = await this.staffService.findById(createAuthDto.managerId.toString());
      if(manager && manager.level <3){
        throw new BadRequestException('Manager is not valid');
      }
    }

    if (staffExists.length > 0) {
      throw new BadRequestException('Staff already exists');
    }

    const password = generate({
      length: 10,
      numbers: true,
      uppercase: true,
      lowercase: true,
      symbols: true,
      excludeSimilarCharacters: true,
    });

    console.log(password)

    const hashedPassword = await argon2.hash(password);
    const isActived = true;
    const random =Math.random().toString(36).substr(2, 4);
    console.log(random);
    const emailCompany = `${createAuthDto.name+random}@Z0Ztech.io`
    const start_date = new Date();

    const newStaff = await this.staffService.create({...createAuthDto, password: hashedPassword,isActived,emailCompany,start_date});
    const rs = await this.mailService.sendMail(
      newStaff.email,
     'Active account',
      {
        url: 'http://localhost:3333/staff',
        emailCompany: newStaff.emailCompany,
        password: password,
      },
    )

    return {
      staff: newStaff.id,
      isActived: newStaff.isActived,
      message: rs,
    }

  }

  async signIn(data: CreateAuthDto):Promise<any> {
    const staffExists = await this.staffService.findByEmail(data.email).then(data => data[0]);

    const {_id} = staffExists;
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

    

    const token = await this.generateToken(staffExists.id,staffExists.email,staffExists.roles.nameRole);
    const { refreshToken } = token;

    const hashRefreshToken = await argon2.hash(refreshToken);
    console.log(_id);
    await this.cacheService.set(_id +'_refreshToken', hashRefreshToken, { ttl: 30*86400 });
    
    return {
      staff: staffExists,
      isActived: staffExists.isActived,
      ...token,
    };
  }

  async generateToken(staffId: string,email:string,role:string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        { id: staffId,email,role },
        {
          secret: this.configService.get<string>('ACCESS_TOKEN_SECRET'),
          expiresIn: this.configService.get<string>('ACCESS_TOKEN_LIFE'),
          
        }
      ),
      this.jwtService.signAsync(
        { id: staffId,email,role },
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
    console.log(staffExists);
    if (!staffExists) {
      throw new BadRequestException('Staff does not exist');
    }
    const otp = await this.generateOtp();
    console.log(otp);
    var ttl = 60;
    await this.cacheService.set(staffExists.id+'otp', otp,{ ttl: ttl });
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

    const newStaff = await this.staffService.updateIsActived(staffId, isActived);

    return {
      staff: staffExists.id,
      isActived: newStaff,
      message: 'Active account success',
    }

  }

  async refreshToken(id,data) {
    const { refreshToken } = data;
    const staffExists = await this.staffService.findById(id);
    console.log({staffExists});
    if (!staffExists) {
      throw new BadRequestException('Staff does not exist');
    }
    const refreshTokenCache = await this.cacheService.get(id+'_refreshToken');
    console.log(refreshTokenCache);
    const isRefreshTokenValid = await argon2.verify(refreshTokenCache,refreshToken);
    if(!isRefreshTokenValid){
      throw new ForbiddenException('Access denied');
    }
    
    const token = await this.generateToken(staffExists.id,staffExists.email,staffExists.roles[0].nameRole);
    const { accessToken, refreshToken: newRefreshToken } = token;
    const hashRefreshToken = await argon2.hash(newRefreshToken);
    await this.cacheService.set(staffExists.id+'_refreshToken', hashRefreshToken, { ttl: 7*86400 });
    return {
      accessToken,
      refreshToken: newRefreshToken,
    }
  }

  async restPassword(id,data) {
    const {otp,password} = data;
    const staffExists = await this.staffService.findById(id);
    if (!staffExists) {
      throw new BadRequestException('Staff does not exist');
    }
    const otpCache = await this.cacheService.get(staffExists.id+'otp');
    console.log(otpCache);
    if(!otpCache){
      throw new BadRequestException('OTP is expired');
    }
    if(otpCache != otp){
      throw new BadRequestException('OTP is not valid');
    }
    const hashedPassword = await argon2.hash(password);
    const newStaff = await this.staffService.restPassword(staffExists.id,  hashedPassword);

    return {
      staff: newStaff.id,
      message: 'Reset password success',
    }

  }

  async changePassword(id,data) {
    const {password,newPassword} = data;
    const rs = this.staffService.updatePassword(id,password,newPassword);
    if(!rs){
      throw new BadRequestException('Old password is not valid');
    }
    return {
      message: 'Change password success',
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
