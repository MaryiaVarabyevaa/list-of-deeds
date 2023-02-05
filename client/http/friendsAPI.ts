import axios from "axios";
import {IFriend} from "@/types/friends";


export const getFriends= async (userId: string): Promise<IFriend> => {
    const { data } = await axios.post('http://localhost:5000/friends/find', { userId });
    return data;
}
export const getNotFriends= async (userId: string): Promise<IFriend> => {
    const { data } = await axios.post('http://localhost:5000/friends/find-other', { userId });
    return data;
}

export const addFriend = async (userId: string, friendId: string): Promise<any> => {
    const { data } = await axios.post('http://localhost:5000/friends/create', { userId, friendId });
    return data;
}