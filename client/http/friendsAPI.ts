import {IFriend} from "@/types/friends";
import {$host} from "@/http/service";


export const getFriends= async (userId: string): Promise<IFriend> => {
    const { data } = await $host.post('friends/find', { userId });
    return data;
}

export const getNotFriends= async (userId: string): Promise<IFriend> => {
    const { data } = await $host.post('friends/find-other', { userId });
    return data;
}

export const addFriend = async (userId: string, friendId: string): Promise<any> => {
    const { data } = await $host.post('friends/create', { userId, friendId });
    return data;
}