import jwt_decode from 'jwt-decode';
import axios from "axios";
import {IAllUserInfo, IUser} from "@/types/user";
import {IAuth, ILogin} from "@/types/auth";

export const getAllUsers = async (): Promise<IAllUserInfo[]> => {
    const { data } = await axios.get('http://localhost:5000/user');
    return data;
}

export const registration = async (user: IUser): Promise<IAuth> => {
    const { data } = await axios.post('http://localhost:5000/user/registration', user);
    localStorage.setItem('token', data.token);
    return jwt_decode(data.token);
}

export const login = async (user: ILogin): Promise<IAuth> => {
    const { data } = await axios.post('http://localhost:5000/user/login', user);
    localStorage.setItem('token', data.token);
    return jwt_decode(data.token);
}

export const findUser = async (email:string): Promise<IAllUserInfo> => {
    const { data } = await axios.post('http://localhost:5000/user/find', { email });
    return data;
}

export const checkUserByNickname = async (nickname: string): Promise<IAllUserInfo> => {
    const { data } = await axios.post('http://localhost:5000/user/check-by-nickname', { nickname });
    return data;
}
