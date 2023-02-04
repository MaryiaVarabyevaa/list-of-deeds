import {Body, ClassSerializerInterceptor, Controller, Post, Request, UseInterceptors} from '@nestjs/common';
import {ListService} from "./list.service";
import {CreateListDto} from "./dto/create-list.dto";
import {CreateUserDto} from "../user/dto/create-user.dto";
import {List} from "./schemas/list.schema";

@Controller('list')
export class ListController {
    constructor(private listService: ListService) {}

    @Post('create')
    create(@Body() listDto: CreateListDto): Promise<List> {
        return this.listService.create(listDto);
    }

    @Post('find')
    async find(@Request() req): Promise<List[]> | null{
        return this.listService.findList(req.body.userId);
    }

    @Post('delete')
    async delete(@Request() req): Promise<List> {
        return this.listService.delete(req.body.id);
    }

    @Post('update')
    async update(@Request() req): Promise<List> {
        return this.listService.update(req.body.id, req.body.list, req.body.isCompleted);
    }
}
