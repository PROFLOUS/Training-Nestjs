import { Module } from '@nestjs/common';
import { PremmissionFormService } from './premmission-form.service';
import { PremmissionFormController } from './premmission-form.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PremmissionFormSchema } from './schemas/premmission-form.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'PremmissionForm', schema: PremmissionFormSchema }]),
  ],
  controllers: [PremmissionFormController],
  providers: [PremmissionFormService]
})
export class PremmissionFormModule {}
