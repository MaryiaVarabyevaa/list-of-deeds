import {IsNotEmpty, IsString} from "class-validator";

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
        message: 'List items must be strings'
    })
    readonly list: string;
}