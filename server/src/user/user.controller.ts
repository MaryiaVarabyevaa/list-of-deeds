import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Get,
    Post,
    Request,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import {UserService} from "./user.service";
import {CreateUserDto} from "./dto/create-user.dto";
import {AuthService} from "../auth/auth.service";
import {LocalAuthGuard} from "../auth/local-auth.guard";
import {IUser} from "./types/user";


@Controller('user')
export class UserController {
    constructor(
        private userService: UserService,
        private authService: AuthService
    ) {}

    @Post('registration')
    create(@Body() userDto: CreateUserDto)
        : Promise<{token: string}>
    {
        return this.authService.registration(userDto);
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req): Promise<{token: string}> {
        return this.authService.login(req.user);
    }

    @Post('find')
    async findUser(@Request() req): Promise<IUser> {
        return this.userService.findUser(req.body.email);
    }

    @Get()
    getAll(): Promise<IUser[]> {
        return this.userService.getAllUsers();
    }
}
