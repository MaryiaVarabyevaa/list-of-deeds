import {Body, Controller, Post, Request} from '@nestjs/common';
import {FriendsService} from "./friends.service";
import {CreateFriendsDto} from "./dto/create-friends.dto";
import {Friends} from "./schemas/friends.schema";
import {List} from "../list/schemas/list.schema";

@Controller('friends')
export class FriendsController {
    constructor(private friendsService: FriendsService) {}

    @Post('create')
    create(@Body() friendsDto: CreateFriendsDto): Promise<Friends> {
        return this.friendsService.create(friendsDto);
    }

    @Post('find')
    find(@Request() req): Promise<Friends[]> | null {
        return this.friendsService.findFriends(req.body.userId);
    }

}
