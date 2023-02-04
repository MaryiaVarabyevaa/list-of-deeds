import {ITodoList} from "@/types/list";

export interface IUser {
    nickname: string;
    email: string;
    password: string;
}

export interface IAllUserInfo extends IUser {
    _id: string;
}

export enum ListActionTypes {
    ADD_USER = 'ADD_USER',
    RESTORE_FROM_STORAGE = 'RESTORE_FROM_STORAGE'
}

export interface IUserState {
    userId: string,
}