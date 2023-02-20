import { BadRequestException, Injectable } from '@nestjs/common';
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
        const {level,roleId}=createStaffDto;
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

        var role = new  Types.ObjectId(roleId);
        console.log(role);
        createStaffDto.roleId=role;
        const createdStaff = new this.staffModel(createStaffDto);
        return createdStaff.save();
    }

    async findAll(): Promise<StaffDocument[]> {        
        const data = await this.staffModel.aggregate([
            {
                $lookup:{
                  from:"roles",
                  localField:"roleId",
                  foreignField:"_id",
                  as:"roles"
                }
              },
              {
                $unwind:"$roles"
              },
              {
                $project:{
                  roleId:0,
                  roles:{
                    _id:0,
                    createdAt:0,
                    updatedAt:0,
                    __v:0
                  }
                }
              }
        ]);

        return data;
    }

    async findById(id: string): Promise<any> {
        const data = await this.staffModel.aggregate([
            {
                $match:{
                  _id:new ObjectId(id)
                }
              },
              {
                $lookup:{
                  from:"roles",
                  localField:"roleId",
                  foreignField:"_id",
                  as:"roles"
                }
              },
              {
                $project:{
                  roleId:0,
                  roles:{
                    _id:0,
                    createdAt:0,
                    updatedAt:0,
                    __v:0
                  }
                }
              }
        ]);

        return data;
    }

    async findByEmail(email: string): Promise<any> {
        const data = await this.staffModel.aggregate([
            {
                $match:{
                  email: email
                }
              },
              {
                $lookup:{
                  from:"roles",
                  localField:"roleId",
                  foreignField:"_id",
                  as:"roles"
                }
              },
              {
                $unwind:"$roles"
              },
              {
                $project:{
                  roleId:0,
                  roles:{
                    _id:0,
                    createdAt:0,
                    updatedAt:0,
                    __v:0
                  }
                }
              }
        ]);

        return data;
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
            gender: updateStaffDto.gender,
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

    // async filterStaff(data): Promise<StaffDocument[]> {

        
    // }


    async upload(file): Promise<any> {
        const { originalname } = file;
        const bucketS3 = process.env.AWS_BUCKET_NAME;
        console.log(originalname);
        const data = await this.uploadS3(file.buffer, bucketS3, originalname);
        return data;
    }

    async uploadS3(file, bucket, name) {
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

    getS3() {
        return new S3({
            region:process.env.AWS_BUCKET_REGION,
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_KEY_ID,
        });
    }

}
