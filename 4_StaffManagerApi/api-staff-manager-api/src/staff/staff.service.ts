import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { Staff, StaffDocument } from './schemas/staff.schema';
import { S3 } from 'aws-sdk';
import { Logger } from '@nestjs/common';




@Injectable()
export class StaffService {
    constructor(@InjectModel(Staff.name) private staffModel: Model<StaffDocument>) {}

    async create(createStaffDto: CreateStaffDto): Promise<StaffDocument> {
        const {level}=createStaffDto;
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

        const createdStaff = new this.staffModel(createStaffDto);
        return createdStaff.save();
    }

    async findAll(): Promise<StaffDocument[]> {
        return this.staffModel.find().exec();
    }

    async findById(id: string): Promise<StaffDocument> {
        return this.staffModel.findById(id).exec();
    }

    async findByEmail(email: string): Promise<StaffDocument> {
        return this.staffModel.findOne({email}).exec();
    }

    async update(id: string, updateStaffDto: UpdateStaffDto): Promise<StaffDocument> {
        return this.staffModel.findByIdAndUpdate(id, updateStaffDto, {new: true}).exec();
    }

    async remove(id: string): Promise<StaffDocument> {
        return this.staffModel.findByIdAndDelete(id).exec();
    }

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
