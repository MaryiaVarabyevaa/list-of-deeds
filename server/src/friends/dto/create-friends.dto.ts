import {IsNotEmpty, IsString} from "class-validator";

export class CreateFriendsDto {

    @IsNotEmpty({
        message: 'UserIs is a required field'
    })
    @IsString({
        message: 'UserId must be a string'
    })
    userId: string;
}