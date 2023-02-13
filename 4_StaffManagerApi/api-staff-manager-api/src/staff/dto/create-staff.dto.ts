import { Types  } from 'mongoose';

export class CreateStaffDto{
    name: string;
    dob: Date;
    start_date: Date;
    end_date: Date;
    status: boolean;
    position: string;
    phone: string;
    gender: string;
    password: string;
    email: string;
    isActived: boolean;
    image: string;
    address: string;
    level: number;
    max_absence: number;
    departmentId: Types.ObjectId;
    managerId: Types.ObjectId;
    office_equiqmentId: Types.ObjectId;
}