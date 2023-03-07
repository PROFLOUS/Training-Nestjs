import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document,Types, Schema as MongooseSchema  } from 'mongoose';
import { Staff } from 'src/staff/schemas/staff.schema';

export type ClockingDocument = Clocking & Document;

const ObjectId = MongooseSchema.Types.ObjectId;

@Schema()
export class Clocking {
    @Prop({type:ObjectId,required:true,ref:'Staff'})
    staffId: Staff;
    
    @Prop()
    clockIn: string;

    @Prop()
    clockOut: string;

    @Prop()
    status: string;

    @Prop({required:true})
    clockDate: Date;
}

export const ClockingSchema = SchemaFactory.createForClass(Clocking);
