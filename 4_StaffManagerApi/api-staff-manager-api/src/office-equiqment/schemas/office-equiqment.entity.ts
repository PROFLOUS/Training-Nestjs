import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document,Types  } from 'mongoose';

export type OfficeEquiqmentDocument = OfficeEquiqment & Document;

@Schema()
export class OfficeEquiqment {
    @Prop({required:true})
    name: string;

    @Prop({required:true})
    quantity: number;
    
    @Prop({required:true})
    image: string;
    
    @Prop({required:true})
    description: string;
    
}

export const OfficeEquiqmentSchema = SchemaFactory.createForClass(OfficeEquiqment);
