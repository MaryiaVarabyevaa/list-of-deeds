import {Model} from "mongoose";
import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {User, UserDocument} from "./schemas/user.schema";
import {CreateUserDto} from "./dto/create-user.dto";
import {IUser} from "./types/user";

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
    ) {}

    async create(userDto: CreateUserDto): Promise<IUser> {
        const newUser = new this.userModel(userDto);
        return newUser.save();
    }

    async findUser(email: string): Promise<IUser> | null {
        const user = await this.userModel.findOne({email},{__v: 0});
        return user;
    }

    async findById(_id: string[]): Promise<IUser[]> {
        const user = await this.userModel.find({_id},{_id: 1, nickname: 1});
        return user;
    }

    async findNotFriends(_id: string[]): Promise<IUser[]> {
        const user = await this.userModel.find({_id: {$nin : _id}}, {_id: 1, nickname: 1});
        return user;
    }

    async checkByNickname(nickname: string[]): Promise<IUser | null> {
        const user = await this.userModel.findOne({nickname},{_id: 1, nickname: 1});
        return user;
    }

    async checkUserInSystem(nickname: string, email: string): Promise<IUser |  null> {
        const user = await this.userModel.findOne({nickname, email}, {__v: 0});
        // @ts-ignore
        return user? user._doc : null;
    }

    async getAllUsers(): Promise<IUser[]> | null {
        return this.userModel.find().exec();
    }

}
