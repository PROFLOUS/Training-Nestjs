import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document,Types  } from 'mongoose';

export type StaffDocument = Staff & Document;

@Schema()
export class Staff {
  @Prop()
  name: string;

  @Prop()
  dob: Date;

  @Prop()
  start_date: Date;

  @Prop()
  end_date: Date;

  @Prop()
  status: boolean;

  @Prop()
  position: string;

  @Prop()
  phone: string;

  @Prop()
  gender: string;

  @Prop()
  password: string;

  @Prop()
  email: string;

  @Prop()
  isActived: boolean;

  @Prop()
  image: string;

  @Prop()
  address: string;

  @Prop()
  max_absence: number;

  @Prop()
  level: number;

  @Prop()
  departmentId: Types.ObjectId;

  @Prop()
  managerId: Types.ObjectId;

  @Prop()
  office_equiqmentId: Types.ObjectId;


}

export const StaffSchema = SchemaFactory.createForClass(Staff);