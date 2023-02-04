import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import mongoose, {Document} from 'mongoose';
import {User} from "../../user/schemas/user.schema";
import {Type} from "class-transformer";

export type FriendsDocument = Friends & Document;

@Schema()
export class Friends {

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
    @Type(() => User)
    userId: User[];
}

export const FriendsSchema = SchemaFactory.createForClass(Friends);

