import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Friends, FriendsDocument} from "./schemas/friends.schema";
import {CreateFriendsDto} from "./dto/create-friends.dto";
import {UserService} from "../user/user.service";
import {IUser} from "../user/types/user";

@Injectable()
export class FriendsService {
    constructor(
        @InjectModel(Friends.name) private friendsModel: Model<FriendsDocument>,
        private userService: UserService,
    ) {}

    async create(friendsDto: CreateFriendsDto): Promise<Friends> {
        const list = new this.friendsModel(friendsDto);
        return list.save();
    }

    async find(userId): Promise<string[]> | null {
        const friendsId = await this.friendsModel.find({ userId },{friendId: 1, _id: 0});

        if (!friendsId) return [];

        const id = friendsId.map((friendId) => friendId.friendId);
        return id;
    }

    async findFriends(userId: string): Promise<IUser[]> | null {
        const id = await this.find(userId);
        const friends = await this.userService.findById(id);
        return friends;
    }

    async findNotFriends(userId: string): Promise<IUser[]> | null {
       const id  = await this.find(userId);

        const notFriends = await this.userService.findNotFriends([...id, userId]);
        return notFriends;
    }
}
