import jwt_decode from 'jwt-decode';
import axios from "axios";
import {IAllUserInfo, IUser} from "@/types/user";
import {$host} from "@/http/service";

export const getAllUsers = async (): Promise<IAllUserInfo[]> => {
    const { data } = await axios.get('http://localhost:5000/user');
    return data;
}

export const registration = async (user: IUser): Promise<IUser> => {
    const { data } = await $host.post('http://localhost:5000/user/registration', user);
    localStorage.setItem('token', data.token);
    return jwt_decode(data.token);
}

export const login = async (user: IUser): Promise<IUser> => {
    const { data } = await $host.post('http://localhost:5000/user/registration', user);
    localStorage.setItem('token', data.token);
    return jwt_decode(data.token);
}