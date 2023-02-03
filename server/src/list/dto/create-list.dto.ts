import {IsArray, IsNotEmpty, IsString} from "class-validator";

export class CreateListDto {
    @IsNotEmpty({
        message: 'UserIs is a required field'
    })
    @IsString({
        message: 'UserId must be a string'
    })
    userId: string;

    @IsNotEmpty({
        message: 'List is a required field'
    })
    @IsString({
        each: true,
        message: 'List items must be strings'
    })
    @IsArray({
        message: 'List must be a string'
    })
    readonly list: string[];
}