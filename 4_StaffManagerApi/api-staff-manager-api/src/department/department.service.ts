import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { Department, DepartmentDocument } from './schemas/department.entity';

@Injectable()
export class DepartmentService {

  constructor(
    @InjectModel(Department.name) private departmentModel: Model<DepartmentDocument>,
  ) {}

  create(createDepartmentDto: CreateDepartmentDto) {
    return this.departmentModel.create(createDepartmentDto);
  }

  findAll() {
    return this.departmentModel.find();
  }

  findOne(id: number) {
    return this.departmentModel.findById(id);
  }

  update(id: number, updateDepartmentDto: UpdateDepartmentDto) {
    return this.departmentModel.findByIdAndUpdate(id, updateDepartmentDto)
  }

  remove(id: number) {
    return this.departmentModel.findByIdAndDelete(id);
  }
}
