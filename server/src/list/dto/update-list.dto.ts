import {IsBoolean, IsNotEmpty, IsString} from "class-validator";

export class UpdateListDto {
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

    @IsNotEmpty({
        message: 'isDeleted is a required field'
    })
    @IsBoolean({
        message: 'isDeleted field must be a boolean value'
    })
    isDeleted: boolean;

    @IsNotEmpty({
        message: 'isCompleted is a required field'
    })
    @IsBoolean({
        message: 'isCompleted field must be a boolean value'
    })
    isCompleted: boolean;
}