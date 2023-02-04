import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, {Document, ObjectId} from 'mongoose';
import {User, UserSchema} from "../../user/schemas/user.schema";
import {Transform, Type} from "class-transformer";

export type ListDocument = List & Document;

@Schema()
export class List {

    @Prop({ required: true })
    list: string;

    @Prop({ required: true })
    isDeleted: boolean;

    @Prop({ required: true })
    isCompleted: boolean;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
    @Type(() => User)
    userId: User;
}

export const ListSchema = SchemaFactory.createForClass(List);

