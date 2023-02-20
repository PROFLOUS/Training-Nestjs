import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document,Types  } from 'mongoose';

export type RoleDocument = Role & Document;

@Schema()
export class Role {
    @Prop()
    nameRole: string;
    
    @Prop()
    description: string;
    
}

export const RoleSchema = SchemaFactory.createForClass(Role);
