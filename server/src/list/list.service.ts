import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {List, ListDocument} from "./schemas/list.schema";
import {CreateListDto} from "./dto/create-list.dto";

@Injectable()
export class ListService {
    constructor(@InjectModel(List.name) private listModel: Model<ListDocument>) {}

    async create(listDto: CreateListDto): Promise<List> {
        const list = new this.listModel(listDto);
        return list.save();
    }

    async findOne(_id: string): Promise<List> | null{
        const user = await this.listModel.findOne({ _id },{__v: 0});
        return user;
    }

    async findList(userId: string): Promise<List[]> | null {
        const user = await this.listModel.find({$and : [{userId}, {isDeleted: false}]},{__v: 0});

        if (!user) {
            throw new HttpException(
                {
                    status: HttpStatus.OK,
                    error: 'Oops, you don\'t have any good deeds yet',
                },
                HttpStatus.OK,
            );
        }

        return user;
    }

    async delete(_id: string): Promise<List> {
        const hasItem = await this.findOne(_id);
        if (!hasItem) {
            throw new HttpException(
                {
                    status: HttpStatus.OK,
                    error: 'There is no such case on the list',
                },
                HttpStatus.OK,
            );
        }

        const updatedList = this.listModel.findByIdAndUpdate({ _id }, { isDeleted: true });
        return updatedList;
    }

    async update(_id: string, list: string): Promise<List> {
        const hasItem = await this.findOne(_id);
        if (!hasItem) {
            throw new HttpException(
                {
                    status: HttpStatus.OK,
                    error: 'There is no such case on the list',
                },
                HttpStatus.OK,
            );
        }

        const updatedList = this.listModel.findByIdAndUpdate({ _id }, { list });
        return updatedList;
    }

    async completeTask(_id: string, isCompleted: boolean): Promise<List> {
        const hasItem = await this.findOne(_id);
        if (!hasItem) {
            throw new HttpException(
                {
                    status: HttpStatus.OK,
                    error: 'There is no such case on the list',
                },
                HttpStatus.OK,
            );
        }

        const updatedList = this.listModel.findByIdAndUpdate({ _id }, { isCompleted: isCompleted });
        return updatedList;
    }
}
