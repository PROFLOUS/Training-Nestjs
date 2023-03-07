import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateOfficeEquiqmentForStaffDto } from './dto/create-office-equiqment-for-staff.dto';
import { UpdateOfficeEquiqmentForStaffDto } from './dto/update-office-equiqment-for-staff.dto';
import { OfficeEquiqmentForStaffDocument } from './schemas/office-equiqment-for-staff.entity';

@Injectable()
export class OfficeEquiqmentForStaffService {

  constructor(
    @InjectModel('OfficeEquiqmentForStaff') private readonly officeEquiqmentForStaffModel: Model<OfficeEquiqmentForStaffDocument>,
  ) {}


  create(createOfficeEquiqmentForStaffDto: CreateOfficeEquiqmentForStaffDto) {
    return this.officeEquiqmentForStaffModel.create({...createOfficeEquiqmentForStaffDto,receivedDate: new Date()});
  }

  findAll() {
    return this.officeEquiqmentForStaffModel.find().populate('staffId').populate('oEId');
  }

  findOne(id: number) {
    return this.officeEquiqmentForStaffModel.findById(id);
  }

  update(id: number, updateOfficeEquiqmentForStaffDto: UpdateOfficeEquiqmentForStaffDto) {
    return this.officeEquiqmentForStaffModel.findByIdAndUpdate(id, updateOfficeEquiqmentForStaffDto);
  }

  remove(id: number) {
    return this.officeEquiqmentForStaffModel.findByIdAndDelete(id);
  }
}
