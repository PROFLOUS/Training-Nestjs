import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document,Types ,Schema as MongooseSchema } from 'mongoose';
import { Department } from 'src/department/schemas/department.entity';
import { Role } from 'src/role/schemas/role.entity';




export type StaffDocument = Staff & Document;

@Schema()
export class Staff {
  @Prop({index:true})
  name: string;

  @Prop({required:true})
  dob: Date;

  @Prop({required:true})
  start_date: Date;


  @Prop({required:true})
  position: string;

  @Prop({required:true,unique:true})
  phone: string;

  @Prop({required:true})
  password: string;

  @Prop({required:true,unique:true,index:true})
  email: string;

  @Prop({required:true})
  emailCompany: string;

  @Prop({required:true})
  isActived: boolean;

  @Prop()
  image: string;

  @Prop({required:true})
  address: string;

  @Prop()
  max_absence: number;

  @Prop({required:true})
  level: number;

  @Prop({ type:MongooseSchema.Types.ObjectId, required:true,ref:'Department'})
  departmentId: Department;

  @Prop({ type:MongooseSchema.Types.ObjectId, ref:'Staff'})
  managerId: Staff;

  @Prop({ type:MongooseSchema.Types.ObjectId ,required:true,ref:'Role'})
  roleId: Role;
}


export const StaffSchema = SchemaFactory.createForClass(Staff);
StaffSchema.index({email:'text'});

