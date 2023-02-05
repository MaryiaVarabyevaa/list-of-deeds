import jwt_decode from 'jwt-decode';
import {IAllUserInfo, IUser} from "@/types/user";
import {IAuth, ILogin} from "@/types/auth";
import {$host} from "@/http/service";

export const getAllUsers = async (): Promise<IAllUserInfo[]> => {
    const { data } = await $host.get('user');
    return data;
}

export const registration = async (user: IUser): Promise<IAuth> => {
    const { data } = await $host.post('user/registration', user);
    localStorage.setItem('token', data.token);
    return jwt_decode(data.token);
}

export const login = async (user: ILogin): Promise<IAuth> => {
    const { data } = await $host.post('user/login', user);
    localStorage.setItem('token', data.token);
    return jwt_decode(data.token);
}

export const findUser = async (email:string): Promise<IAllUserInfo> => {
    const { data } = await $host.post('user/find', { email });
    return data;
}

export const checkUserByNickname = async (nickname: string): Promise<IAllUserInfo> => {
    const { data } = await $host.post('user/check-by-nickname', { nickname });
    return data;
}
