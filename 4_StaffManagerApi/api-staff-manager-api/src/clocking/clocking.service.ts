import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model,Types } from 'mongoose';
import { CreateClockingDto } from './dto/create-clocking.dto';
import { UpdateClockingDto } from './dto/update-clocking.dto';
import { Clocking, ClockingDocument } from './schemas/clocking.entity';

@Injectable()
export class ClockingService {
  constructor(
    @InjectModel(Clocking.name) private clokingModel: Model<ClockingDocument>,
) {}

  createClockIn(staffId) {
    const currentDate = new Date().toLocaleTimeString();
    const currentTime =  this.convertTime12to24(currentDate);
    console.log(currentTime);
    const clockIn = currentTime;
    const clockDate = new Date();
    const newClocking = new this.clokingModel({staffId,clockIn,clockDate});
    return newClocking.save();
  }

  createClockOut(id:string) {
    console.log("out");
    const currentDate = new Date().toLocaleTimeString();
    const currentTime =  this.convertTime12to24(currentDate);
    console.log(currentTime);

    return this.clokingModel.updateOne(
      {staffId:new Types.ObjectId(id)},
      {$set:{clockOut:currentTime }}
    )

  }
  // get list clocking by month and year
  async findByMon(month:number,year:number) {
    console.log(month);
    console.log(year);
    try{
       const rs = await this.clokingModel.find(
        {
          $and:[
            { "$expr": { "$eq": [{ "$month": "$clockDate" }, month] } },
            { "$expr": { "$eq": [{ "$year": "$clockDate" }, year] } }
          ]
        }
      ).exec();
      if(rs.length == 0){
        return {
          message:"No data"
        }
      }
      return rs;
    }
    catch(err){
      throw new Error(err.message);
    }
  }

  async findByStaffWithMY(staffId:string,month:number,year:number) {
    console.log(month);
    console.log(year);
    try{
        const rs = await this.clokingModel.find(
        {
          $and:[
            {staffId:new Types.ObjectId(staffId)},
            { "$expr": { "$eq": [{ "$month": "$clockDate" }, month] } },
            { "$expr": { "$eq": [{ "$year": "$clockDate" }, year] } }
          ]
        }
      ).exec();
      if(rs.length == 0){
        return {
          message:"No data"
        }
      }
      return rs;
    }
    catch(err){
      throw new Error(err.message);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} clocking`;
  }

  update(id: string, updateClockingDto: UpdateClockingDto) {
    const rs = this.clokingModel.findByIdAndUpdate(id,updateClockingDto,{new:true}).exec();
    if(rs){
      return rs;
    }
  }

  remove(id: string) {
    return this.clokingModel.findByIdAndDelete(id).exec();
  }

  convertTime12to24 (time12h) {
    const [time, modifier] = time12h.split(' ');
  
    let [hours, minutes] = time.split(':');
  
    if (hours === '12') {
      hours = '00';
    }
  
    if (modifier === 'PM') {
      hours = parseInt(hours, 10) + 12;
    }
  
    return `${hours}:${minutes}`;
  }

}
