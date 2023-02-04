import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import mongoose, {Document} from 'mongoose';
import {User} from "../../user/schemas/user.schema";
import {Type} from "class-transformer";

export type ListDocument = List & Document;

@Schema()
export class List {

    @Prop({ required: true })
    list: string[];


    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
    @Type(() => User)
    userId: User;
}

export const ListSchema = SchemaFactory.createForClass(List);

