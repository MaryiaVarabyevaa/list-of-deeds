import {IsEmail, IsNotEmpty, IsString, Matches} from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty({
        message: 'Nickname is a required field'
    })
    @IsString({
        message: 'Nickname must be a string'
    })
    @Matches(/^[a-zA-Z0-9._-]+$/, {
        message: 'Nickname field contains not correct value'
    })
    readonly nickname: string;

    @IsNotEmpty({
        message: 'Email is a required field'
    })
    @IsString({
        message: 'Email must be a string'
    })
    @IsEmail({}, {
        message: 'Incorrect email'
    })
    readonly email: string;

    @IsNotEmpty({
        message: 'password is a required field'
    })
    @IsString({
        message: 'Password must be a string'
    })
    @Matches(/^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{7,}$/, {
        message: 'Password can contain latin alphabet and numbers'
    })
    readonly password: string;
}