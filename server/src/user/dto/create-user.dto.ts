import {IsNotEmpty, IsString} from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty({
        message: 'Nickname is a required field'
    })
    @IsString({
        message: 'Nickname must be a string'
    })
    readonly nickname: string;

    @IsNotEmpty({
        message: 'Email is a required field'
    })
    @IsString({
        message: 'Email must be a string'
    })
    readonly email: string;

    @IsNotEmpty({
        message: 'password is a required field'
    })
    @IsString({
        message: 'Password must be a string'
    })
    readonly password: string;
}