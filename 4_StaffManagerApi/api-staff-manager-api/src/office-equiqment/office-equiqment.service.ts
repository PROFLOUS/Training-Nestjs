import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OfficeEquiqmentForStaffService } from 'src/office-equiqment-for-staff/office-equiqment-for-staff.service';
import { StaffService } from 'src/staff/staff.service';
import { CreateOfficeEquiqmentDto } from './dto/create-office-equiqment.dto';
import { UpdateOfficeEquiqmentDto } from './dto/update-office-equiqment.dto';
import { OfficeEquiqmentDocument } from './schemas/office-equiqment.entity';
import { Types } from 'mongoose';

@Injectable()
export class OfficeEquiqmentService {

  constructor(
    @InjectModel('OfficeEquiqment') private officeEquiqmentModel: Model<OfficeEquiqmentDocument>,
    private staffService: StaffService,
    private oEFSService: OfficeEquiqmentForStaffService,
  ) {}

  create(createOfficeEquiqmentDto: CreateOfficeEquiqmentDto) {
    return this.officeEquiqmentModel.create(createOfficeEquiqmentDto);
  }

  findAll() {
    return this.officeEquiqmentModel.find();
  }

  findOne(id: string) {
    return this.officeEquiqmentModel.findById(id);
  }

  update(id: string, updateOfficeEquiqmentDto: UpdateOfficeEquiqmentDto) {
    return this.officeEquiqmentModel.findByIdAndUpdate(id, updateOfficeEquiqmentDto);
  }


  updateQty(id: string, qty: number) {
    return this.officeEquiqmentModel.updateOne(
      {_id:id},
      {$set:{quantity:qty}}
    );
  }

  remove(id: string) {
    return this.officeEquiqmentModel.findByIdAndDelete(id);
  }

  async addOfficeEquiqmentToStaff(officeEquiqmentId: string,staffId : string, qty: number) {
    const staff = await this.staffService.findById(staffId);
    const officeEquiqment = await this.findOne(officeEquiqmentId);
    Number(qty);
    if(!staff) return 'Staff not found';
    if(!officeEquiqment) return 'Office Equiqment not found';
    if(officeEquiqment.quantity < qty) return 'Not enough quantity';

    // if(staff[0]?.officeEquiqments?.length > 0){
    //   const index = staff[0].officeEquiqments.findIndex((oE) => oE.oEId == officeEquiqmentId);
    //   if(index > -1){
    //     const newQty = Number(staff[0].officeEquiqments[index].qty) + Number(qty);
    //     if(officeEquiqment.quantity < qty) return 'Not enough quantity';
    //     await this.staffService.updateOEquipmentUpdate(staffId,{oEId:officeEquiqmentId,qty:newQty});
    //     await this.updateQty(officeEquiqmentId,Number(officeEquiqment.quantity)-Number(qty));
    //     return 'Office Equiqment added to staff';
    //   }
    // }
    const newVal={
      oEId: new Types.ObjectId(officeEquiqmentId),
      staffId: new Types.ObjectId(staffId),
      qty:Number(qty),
      returnedDate: null,
      status:"In Use",
    }
    const rs = await this.oEFSService.create(newVal);
    console.log(rs._id);

    await this.updateQty(officeEquiqmentId,officeEquiqment.quantity-qty);
    return {
      message: 'Office Equiqment added to staff',
      rs,
      staffId
    }
  }

  async removeOfficeEquiqmentFromStaff(officeEquiqmentId: string,staffId : string, qty: number) {
    const staff = await this.staffService.findById(staffId);
    const officeEquiqment = await this.findOne(officeEquiqmentId);
    Number(qty);
    if(!staff) return 'Staff not found';
    if(!officeEquiqment) return 'Office Equiqment not found';

    if(staff[0].officeEquiqments.length > 0){
      const index = staff[0].officeEquiqments.findIndex((oE) => oE.oEId == officeEquiqmentId);
      if(index > -1){
        const newQty = Number(staff[0].officeEquiqments[index].qty) - Number(qty);
        if(newQty < 0) return 'Not enough quantity';
        if(newQty === 0){
          await this.staffService.updateOEquipmentRemove(staffId,officeEquiqmentId);
          await this.updateQty(officeEquiqmentId,officeEquiqment.quantity+qty);
          return 'Office Equiqment removed from staff';
        }
        await this.staffService.updateOEquipmentUpdate(staffId,{oEId:officeEquiqmentId,qty:newQty});
        await this.updateQty(officeEquiqmentId,officeEquiqment.quantity+qty);
        return 'Office Equiqment removed from staff';
      }
    }
    return 'Office Equiqment not found in staff';
  }

  async removeAllOfficeEquiqmentFromStaff(staffId: string){
    const staff = await this.staffService.findById(staffId);
    if(!staff) return 'Staff not found';
    if(staff[0].officeEquiqments.length > 0){
      for(let i = 0; i < staff[0].officeEquiqments.length; i++){
        const officeEquiqment = await this.findOne(staff[0].officeEquiqments[i].oEId);
        await this.updateQty(officeEquiqment._id,officeEquiqment.quantity+staff[0].officeEquiqments[i].qty);
      }
      await this.staffService.updateOEquipmentRemoveAll(staffId);
      return 'All Office Equiqment removed from staff';
    }
    return 'No Office Equiqment to remove';
  }

  async getListOEquipmentInUsed(){
      const staffs = await this.staffService.findAll();
      console.log('staff',staffs);
      // let listOEquipmentInUsed = [];
      // for(let i = 0; i < staffs.length; i++){
      //   if(staffs[i]?.officeEquiqments?.length > 0){
      //     for(let j = 0; j < staffs[i]?.officeEquiqments.length; j++){
      //       const officeEquiqment = await this.findOne(staffs[i]?.officeEquiqments[j].oEId.toString());
      //       console.log('officeEquiqment',officeEquiqment);
      //       listOEquipmentInUsed.push({
      //         staffId:staffs[i]._id,
      //         staffName:staffs[i].name,
      //         oEId:officeEquiqment._id,
      //         oEName:officeEquiqment.name,
      //         qty:staffs[i].officeEquiqments[j].qty,
      //         status:staffs[i].officeEquiqments[j].status
      //       });
      //     }
      //   }
      // }
      // return listOEquipmentInUsed;
  }

  listOEquipmentInUse(){
    return 'this is listOEquipmentInUse'
  }

}
