import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model,Types } from 'mongoose';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { Staff, StaffDocument } from './schemas/staff.schema';
import { S3 } from 'aws-sdk';
import { Logger } from '@nestjs/common';
import * as argon2 from 'argon2';
const ObjectId = Types.ObjectId;


@Injectable()
export class StaffService {
    constructor(
        @InjectModel(Staff.name) private staffModel: Model<StaffDocument>,
    ) {}

    async create(createStaffDto: CreateStaffDto): Promise<StaffDocument> {
        const {level,roleId,departmentId,managerId}=createStaffDto;
        if(level==1){
            createStaffDto.max_absence=5;
        }

        if(level==2){
            createStaffDto.max_absence=2;
        }

        if(level==3){
            createStaffDto.max_absence=2;
        }

        if(level==4){
            createStaffDto.max_absence=3;
        }

        const role = new  Types.ObjectId(roleId);
        const department = new Types.ObjectId(departmentId);
        const manager = new Types.ObjectId(managerId);
        console.log(role);
        createStaffDto.roleId=role;
        createStaffDto.departmentId=department;
        createStaffDto.managerId=manager;
        const createdStaff = new this.staffModel(createStaffDto);
        return createdStaff.save();
    }

    async findAll(): Promise<StaffDocument[]> {        
        return await this.staffModel.find()
        .populate('roleId',{_id:1,nameRole:1})
        .populate('departmentId',{_id:1,name:1})
        .populate('managerId',{_id:1,name:1})
        .exec();
    }

    async findById(id: string): Promise<any> {
      return await this.staffModel
       .findById(id)
        .populate('roleId',{_id:1,nameRole:1})
        .populate('departmentId',{_id:1,name:1})
        .populate('managerId',{_id:1,name:1})
        .exec(); 
    }

    async findByEmail(email: string): Promise<any> {
        return await this.staffModel
        .findOne({email:email})
        .populate('roleId',{_id:1,nameRole:1})
        .populate('departmentId',{_id:1,name:1})
        .populate('managerId',{_id:1,name:1})
        .exec();
    }

    async filter (filter: any): Promise<any> {
        const {name,email,phone,role}=filter;
        const queryRegxName = new RegExp(name,'i');
        const queryRegxEmail = new RegExp(email,'i');
        const queryRegxPhone = new RegExp(phone,'i');
        const queryRegxRole = new RegExp(role,'i');

        return await this.staffModel.find({
            $or:[
                {name:queryRegxName},
                {email:queryRegxEmail},
                {phone:queryRegxPhone},
                {'roleId.nameRole':queryRegxRole}
            ],
        })
        .populate('roleId',{_id:1,nameRole:1})
        .populate('departmentId',{_id:1,name:1})
        .populate('managerId',{_id:1,name:1})
        .exec();

      // let name = filter.name === undefined ? null : filter.name;
      // let email = filter.email=== undefined ? null : filter.email;
      // let phone = filter.phone === undefined ? null : filter.phone;
      // let role = filter.role=== undefined ? null : filter.role;
      // let regexName = new RegExp(name,'i');
      // let regexEmail = new RegExp(email , 'i');
      // let regexPhone = new RegExp(phone, 'i');
      // let regexRole = new RegExp(role, 'i');

      //   const data = await this.staffModel.aggregate([
      //     {
      //       $lookup:{
      //         from:"roles",
      //         localField:"roleId",
      //         foreignField:"_id",
      //         as:"roles"
      //       }
      //     },
      //     {
      //       $match:{
      //         $or:[
      //           {
      //             name: regexName
      //           },
      //           {
      //             email:regexEmail
      //           },
      //           {
      //             phone: regexPhone
      //           },
      //           {
      //             'roles.nameRole': regexRole
      //           }
      //         ]
      //       }
      //     },
      //     {
      //       $project:{
      //         roleId:0,
      //         roles:{
      //           _id:0,
      //           createdAt:0,
      //           updatedAt:0,
      //           __v:0
      //         }
      //       }
      //     }
      //   ]);

      //   if(data.length==0){
      //     throw new NotFoundException('Not found');
      //   }


      //   return data;
    }

    async getRoleName(id: string): Promise<StaffDocument> {
        return this.staffModel.findOne({_id:id}).populate('roleId').exec();
    }

    async update(id: string, updateStaffDto: UpdateStaffDto): Promise<StaffDocument> {
        const updateValue = {
            name: updateStaffDto.name,
            email: updateStaffDto.email,
            phone: updateStaffDto.phone,
            address: updateStaffDto.address,
            dob: updateStaffDto.dob,
            image: updateStaffDto.image,

        };
        return this.staffModel.findByIdAndUpdate(id, updateValue, {new: true}).exec();
    }

    async remove(id: string): Promise<StaffDocument> {
        
        return this.staffModel.findByIdAndDelete(id).exec();
    }

    async updateRole(id: string, roleId: string): Promise<StaffDocument> {
      return this.staffModel.findByIdAndUpdate(id, {roleId:roleId}, {new: true}).exec();
    }

    async updateLevel(id: string, level: string): Promise<StaffDocument> {
      return this.staffModel.findByIdAndUpdate(id, {level:level}, {new: true}).exec();
    }

    async updateIsActived(id: string, isActived: boolean): Promise<boolean> {
      const rs = this.staffModel.findByIdAndUpdate(id, {isActived:isActived}, {new: true}).exec();
      if(rs){
        return true;
      }
    }

    async updatePassword(id: string, password: string,newPassword: string): Promise<StaffDocument> {
      const staffExists = await this.findById(id).then(data => data[0]);

      const isPasswordValid = await argon2.verify(
        staffExists.password,
        password,
      );
      if (!isPasswordValid) {
        throw new BadRequestException('Password is not valid');
      }

      const hashedPassword = await argon2.hash(newPassword);

      return this.staffModel.findByIdAndUpdate(id,{password:hashedPassword})
    }

    async restPassword(id: string, password: string): Promise<StaffDocument> {
      const hashedPassword = await argon2.hash(password);
      return this.staffModel.findByIdAndUpdate(id,{password:hashedPassword})
    }

    async updateOEquipment(id: string, oefsId:any): Promise<any> {
      return await this.staffModel.update(
        {_id:new Types.ObjectId(id)},
        {officeEquiqmentForStaff: new Types.ObjectId(oefsId)},
      );
    }

    async updateOEquipmentRemove(id: string, oEquipment:any): Promise<any> {
      return await this.staffModel.updateOne(
        {_id:new Types.ObjectId(id)},
        {$pull:{officeEquiqments:oEquipment}}
      );
    }

    async updateOEquipmentRemoveAll(id: string): Promise<any> {
      return await this.staffModel.updateOne(
        {_id:new Types.ObjectId(id)},
        {$set:{officeEquiqments:[]}}
      );
    }

    async updateOEquipmentUpdate(id: string, oEquipment:any): Promise<any> {
      return await this.staffModel.updateOne(
        {_id: new Types.ObjectId(id),"officeEquiqments.oEId":new Types.ObjectId(oEquipment.oEId)},
        {$set:{"officeEquiqments.$.qty":oEquipment.qty}}
      );
    }

    async updateStatusOEquipment(id: string, oEquipment:any): Promise<any> {
      return await this.staffModel.updateOne(
        {_id: new Types.ObjectId(id),"officeEquiqments.oEId":new Types.ObjectId(oEquipment.oEId)},
        {$set:{"officeEquiqments.$.status":oEquipment.status}}
      );
    }

    

    // async filterStaff(data): Promise<StaffDocument[]> {

        
    // }


    async upload(file): Promise<any> {
        const { originalname } = file;
        const bucketS3 = process.env.AWS_BUCKET_NAME;
        console.log(originalname);
        const data = await this.uploadS3(file.buffer, bucketS3, originalname);
        return data;
    }

    async uploadS3(file, bucket, name): Promise<any> {
        const s3 = this.getS3();
        const params = {
            Bucket: bucket,
            Key: String(name),
            Body: file,
        };
        return new Promise((resolve, reject) => {
            s3.upload(params, (err, data) => {
            if (err) {
                console.log("err",err);
                Logger.error(err);
                reject(err.message);
            }
            resolve(data);
            });
        });
    }

    getS3(): S3 {
        return new S3({
            region:process.env.AWS_BUCKET_REGION,
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_KEY_ID,
        });
    }

    

}
