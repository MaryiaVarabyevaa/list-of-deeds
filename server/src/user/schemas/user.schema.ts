import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {Document, ObjectId} from 'mongoose';
import {Transform} from "class-transformer";

export type UserDocument = User & Document;

@Schema()
export class User {

    @Prop({ required: true })
    nickname: string;

    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    password: string;

}

export const UserSchema = SchemaFactory.createForClass(User);