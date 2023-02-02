import {IsString} from 'class-validator';

export class CreateUserDto {
    @IsString({
        message: 'Email must be a string'
    })
    readonly email: string;
    @IsString({
        message: 'Password must be a string'
    })
    readonly password: string;
}