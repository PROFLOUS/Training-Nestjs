import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document,Types, Schema as MongooseSchema   } from 'mongoose';
import { OfficeEquiqment } from 'src/office-equiqment/schemas/office-equiqment.entity';
import { Staff } from 'src/staff/schemas/staff.schema';

export type OfficeEquiqmentForStaffDocument = OfficeEquiqmentForStaff & Document;

const ObjectId = MongooseSchema.Types.ObjectId;

@Schema()
export class OfficeEquiqmentForStaff {

    @Prop({type:ObjectId ,required:true,ref:'OfficeEquiqment'})
    oEId: OfficeEquiqment;

    @Prop({type:ObjectId ,required:true,ref:'Staff'})
    staffId: Staff;

    @Prop({required:true})
    qty: number;

    @Prop({required:true})
    receivedDate: Date;

    @Prop()
    returnedDate: Date;

    @Prop({required:true})
    status: string;

}

export const OfficeEquiqmentForStaffSchema = SchemaFactory.createForClass(OfficeEquiqmentForStaff);
