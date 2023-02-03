export interface IUser {
    nickname: string;
    email: string;
    password: string;
}

export interface IAllUserInfo extends IUser {
    id: string;
}