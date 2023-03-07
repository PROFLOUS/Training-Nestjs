import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { ApproveDto } from './dto/approve.dto';
import { CreatePremmissionFormDto } from './dto/create-premmission-form.dto';
import { UpdatePremmissionFormDto } from './dto/update-premmission-form.dto';
import { PremmissionForm, PremmissionFormDocument } from './schemas/premmission-form.entity';
import mongoose, { Model,Types } from 'mongoose';

@Injectable()
export class PremmissionFormService {

  constructor(
    @InjectModel(PremmissionForm.name) private preFormModel: Model<PremmissionFormDocument>,
  ) {}

  create(createPremmissionFormDto: CreatePremmissionFormDto) {
    const startDate = new Date(createPremmissionFormDto.startDate)
    let endDate = new Date(createPremmissionFormDto?.endDate)
    const sendDate = new Date()
    if(!createPremmissionFormDto.endDate){
      endDate = startDate;
    }
    console.log('sendDate',sendDate);
    console.log('startDate',startDate);
    console.log('endDate',endDate);
    if(sendDate > startDate){
      console.log('sendDate > startDate')
      return 'sendDate must be less than startDate';
    }
    if(startDate > endDate){
      console.log('startDate > endDate')
      return 'startDate must be less than endDate';
    }

    const status = 'Pending';
    const staffId = new Types.ObjectId(createPremmissionFormDto.staffId);

    const newPremmissionForm = new this.preFormModel({
      ...createPremmissionFormDto,
      staffId,
      sendDate,
      startDate,
      endDate,
      status,
    });

    return newPremmissionForm.save();

  }

  findAll() {
    return this.preFormModel.find();
  }

  findByIdForm(id: string) {
    return this.preFormModel.findById(id);
  }

  async findByStaffId(id: string,status:string,month:number,year:number) {
    const monthIn = Number(month);
    const yearIn = Number(year);
    console.log('status',status);
    let data;
    if(status === 'ALL'){
      data = await this.preFormModel.aggregate([
        {
          $match:{
            $and:[
              { "$expr":
                {"$or":[
                  {staffId:new Types.ObjectId(id)},
                  {approverId:new Types.ObjectId(id)}
                ]}
              },
              { "$expr": 
                {"$or":[
                  { "$eq": [{ "$month": "$startDate" }, monthIn] },
                  { "$eq": [{ "$month": "$endDate" }, monthIn] }
                ]} 
              },
              { "$expr": 
                {"$or":[
                  { "$eq": [{ "$year": "$startDate" }, yearIn] },
                  { "$eq": [{ "$year": "$endDate" }, yearIn] }
                ]}  
              }
            ]
          }
        }
        ,
        {
          $lookup:{
            from:"staffs",
            localField:"staffId",
            foreignField:"_id",
            as:"staff"
          }
        },
        {
          $lookup:{
            from:"staffs",
            localField:"approverId",
            foreignField:"_id",
            as:"staff_approver"
          }
        },
        {
          $project:{
            _id:1,
            sendDate:1,
            startDate:1,
            endDate:1,
            reason:1,
            status:1,
            type:1,
            image:1,
            approverComment:1,
            approverDate:1,
            staff:{
              _id:1,
              name:1,
            },
            staff_approver:{
              _id:1,
              name:1,
            }
          }
        }
       ]);

    }
    else{
      data = await this.preFormModel.aggregate([
        {
          $match:{
            $and:[
              {staffId:new Types.ObjectId(id)}
              ,
              { "$expr": 
                {"$or":[
                  { "$eq": [{ "$month": "$startDate" }, monthIn] },
                  { "$eq": [{ "$month": "$endDate" }, monthIn] }
                ]} 
              },
              { "$expr": 
                {"$or":[
                  { "$eq": [{ "$year": "$startDate" }, yearIn] },
                  { "$eq": [{ "$year": "$endDate" }, yearIn] }
                ]}  
              },
              {status:status}
              
            ]
          }
        }
        ,
        {
          $lookup:{
            from:"staffs",
            localField:"staffId",
            foreignField:"_id",
            as:"staff"
          }
        },
        {
          $lookup:{
            from:"staffs",
            localField:"approverId",
            foreignField:"_id",
            as:"staff_approver"
          }
        },
        {
          $project:{
            _id:1,
            sendDate:1,
            startDate:1,
            endDate:1,
            reason:1,
            status:1,
            type:1,
            image:1,
            approverComment:1,
            approverDate:1,
            staff:{
              _id:1,
              name:1,
            },
            staff_approver:{
              _id:1,
              name:1,
            }
          }
        }
       ]);
    }
    if(data.length === 0){
      return 'No data';
    }

    const duration = data.map((item:any)=>{
      const start = new Date(item.startDate);
      const end = new Date(item.endDate);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays+1;
    })

    data.map((item:any,index:number)=>{
      item.duration = duration[index];
    })

    return data;
  }

  findByApproverId(id: string) {
    return this.preFormModel.find({
      approverId: id,
    })
  }

  update(id: string, updatePremmissionFormDto: UpdatePremmissionFormDto) {
    return this.preFormModel.findByIdAndUpdate(id, updatePremmissionFormDto, { new: true })
  }

  async approve(id: string,approve: ApproveDto) {
    
    const afid = await this.findByIdForm(id);
    const idApp = afid.approverId
    const approverId = new Types.ObjectId(approve.approverId);
    if(idApp.toString() !== approverId.toString()){
      return 'ApproverId is not correct';
    }
    const approverDate = new Date();
    return this.preFormModel.findByIdAndUpdate(id,{...approve,approverId,approverDate},{ new: true } );

  }
  

  remove(id: string) {
    return this.preFormModel.findByIdAndDelete(id)
  }
}
