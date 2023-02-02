import {Body, Controller, Post} from '@nestjs/common';
import {UserService} from "./user.service";
import {CreateUserDto} from "./dto/create-user.dto";

@Controller('user')
export class UserController {
    constructor(
        private userService: UserService,
    ) {}

    @Post('registration')
    create(@Body() userDto: CreateUserDto) {
        return this.userService.registration(userDto); ;
    }
}
