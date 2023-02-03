import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {User, UserSchema} from "../../user/schemas/user.schema";
import {Transform, Type} from "class-transformer";

export type ListDocument = List & Document;

@Schema()
export class List {

    @Prop({ required: true })
    list: string[];


    @Prop({
        type: UserSchema,
        required: true
    })
    @Type(() => User)
    userId: User;
}

export const ListSchema = SchemaFactory.createForClass(List);

