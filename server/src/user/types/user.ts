import {User} from "../schemas/user.schema";

export interface IUser extends User {
    _id: string;
}