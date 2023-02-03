import {Model, Types} from "mongoose";
import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {User, UserDocument} from "./schemas/user.schema";
import {CreateUserDto} from "./dto/create-user.dto";
import {IUser} from "./types/user";

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    async create(userDto: CreateUserDto): Promise<IUser> {
        const newUser = new this.userModel(userDto);
        return newUser.save();
    }

    async findUser(email: string): Promise<IUser> | null {
        const user = await this.userModel.findOne({email},{__v: 0});
        return user;
    }

    async checkUserInSystem(nickname: string, email: string) {
        const user = await this.userModel.findOne({nickname, email}, {__v: 0});
        // @ts-ignore
        //todo: change type _id in IUser
        return user? user._doc : null;
        return user;
    }

    async getAllUsers(): Promise<IUser[]> {
        return this.userModel.find().exec();
    }
}
