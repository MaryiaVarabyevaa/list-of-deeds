import {IsNotEmpty, IsString} from "class-validator";

export class CreateFriendsDto {

    @IsNotEmpty({
        message: 'UserIs is a required field'
    })
    @IsString({
        message: 'UserId must be a string'
    })
    userId: string;

    @IsNotEmpty({
        message: 'FriendId field is a required field'
    })
    @IsString({
        message: 'FriendId field must be a string'
    })
    friendId: string;
}