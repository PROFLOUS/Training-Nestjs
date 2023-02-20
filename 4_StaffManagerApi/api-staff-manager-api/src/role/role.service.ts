import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role, RoleDocument } from './entities/role.entity';

@Injectable()
export class RoleService {

  constructor(@InjectModel(Role.name) private roleModel: Model<RoleDocument>) {}


  async create(createRoleDto: CreateRoleDto) {
    return await this.roleModel.create(createRoleDto);
  }

  async findAll() {
    return await this.roleModel.find().exec();
  }

  async findOne(id: number) {
    return await this.roleModel.findById(id).exec();
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return `This action updates a #${id} role`;
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
