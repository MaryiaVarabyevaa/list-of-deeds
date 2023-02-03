import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {List, ListDocument} from "./schemas/list.schema";
import {CreateUserDto} from "../user/dto/create-user.dto";
import {IUser} from "../user/types/user";
import {CreateListDto} from "./dto/create-list.dto";

@Injectable()
export class ListService {
    constructor(@InjectModel(List.name) private listModel: Model<ListDocument>) {}

    async create(listDto: CreateListDto): Promise<List> {
        const list = new this.listModel(listDto);
        return list.save();
    }
}
