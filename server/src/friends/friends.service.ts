import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Friends, FriendsDocument} from "./schemas/friends.schema";
import {CreateFriendsDto} from "./dto/create-friends.dto";
import {List} from "../list/schemas/list.schema";

@Injectable()
export class FriendsService {
    constructor(@InjectModel(Friends.name) private friendsModel: Model<FriendsDocument>) {}

    async create(friendsDto: CreateFriendsDto): Promise<Friends> {
        const list = new this.friendsModel(friendsDto);
        return list.save();
    }

    async findFriends(userId: string): Promise<Friends[]> | null{
        const user = await this.friendsModel.find({ userId },{__v: 0});
        return user;
    }
}
