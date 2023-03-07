import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StaffModule } from './staff/staff.module';
import { AuthModule } from './auth/auth.module';
import { RoleModule } from './role/role.module';
import { ClockingModule } from './clocking/clocking.module';
import { MailModule } from './mail/mail.module';
import { DepartmentModule } from './department/department.module';
import { PremmissionFormModule } from './premmission-form/premmission-form.module';
import { OfficeEquiqmentModule } from './office-equiqment/office-equiqment.module';
import * as redisStore from 'cache-manager-redis-store';
import { RouterModule } from '@nestjs/core';
import { OfficeEquiqmentForStaffModule } from './office-equiqment-for-staff/office-equiqment-for-staff.module';

@Module({
  imports: [
  ConfigModule.forRoot({
    isGlobal: true,
  }),
  MongooseModule.forRoot(process.env.MONGO_URI),CacheModule.register(
    { 
      isGlobal: true,
      store: redisStore,
      host: 'localhost',
      port: 6379, 
      db: 0,
      ttl: 600,
    }
    ),
    StaffModule, AuthModule, RoleModule, ClockingModule, MailModule, DepartmentModule, PremmissionFormModule, OfficeEquiqmentModule, OfficeEquiqmentForStaffModule],
})
export class AppModule {}
