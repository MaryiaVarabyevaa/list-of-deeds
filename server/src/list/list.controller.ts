import {Body, ClassSerializerInterceptor, Controller, Post, UseInterceptors} from '@nestjs/common';
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
}
