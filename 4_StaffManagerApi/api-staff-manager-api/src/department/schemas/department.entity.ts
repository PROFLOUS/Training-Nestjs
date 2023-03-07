import mongoose, { Document,Types,Schema as MongooseSchema  } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Staff } from 'src/staff/schemas/staff.schema';
export type DepartmentDocument = Department & Document;

const ObjectId = MongooseSchema.Types.ObjectId;

@Schema()
export class Department {

    @Prop({required:true})
    name: string;

    @Prop()
    description: string;

    @Prop({required:true})
    status: string;

    @Prop({type:ObjectId ,required:true,ref:'Staff'})
    managerId: Staff;


}

export const DepartmentSchema = SchemaFactory.createForClass(Department);
