import {Body, Controller, Get, Post} from '@nestjs/common';
import {UserService} from "./user.service";
import {CreateUserDto} from "./dto/create-user.dto";
import {User} from "./schemas/user.schema";

@Controller('user')
export class UserController {
    constructor(
        private userService: UserService,
    ) {}

    @Post('registration')
    create(@Body() userDto: CreateUserDto): Promise<User> {
        return this.userService.registration(userDto);
    }

    @Get()
    getAll(): Promise<User[]> {
        return this.userService.getAllUsers();
    }
}
