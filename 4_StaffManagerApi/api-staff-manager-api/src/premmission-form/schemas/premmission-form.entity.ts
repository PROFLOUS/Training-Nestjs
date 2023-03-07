import mongoose, { Document,Types, Schema as MongooseSchema  } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Staff } from 'src/staff/schemas/staff.schema';

export type PremmissionFormDocument = PremmissionForm & Document;

const ObjectId = MongooseSchema.Types.ObjectId;

@Schema()
export class PremmissionForm {

    @Prop({ type:ObjectId, required:true,ref:'Staff'})
    staffId: Staff;

    @Prop({required:true})
    sendDate: Date;

    @Prop({required:true})
    startDate: Date;

    @Prop()
    endDate: Date;

    @Prop({required:true})
    reason: string;

    @Prop({required:true})
    type: string;

    @Prop({ type:ObjectId ,required:true,ref:'Staff'})
    approverId: Staff;

    @Prop()
    approverDate: Date;

    @Prop()
    approverComment: string;

    @Prop()
    status: string;

    @Prop()
    image: string;
    
}

export const PremmissionFormSchema = SchemaFactory.createForClass(PremmissionForm);
PremmissionFormSchema.index({status:1})
PremmissionFormSchema.index({staffId:1})
PremmissionFormSchema.index({approverId:1})
PremmissionFormSchema.index({startDate:1})
PremmissionFormSchema.index({endDate:1})


