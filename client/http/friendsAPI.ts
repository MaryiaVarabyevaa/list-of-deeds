import axios from "axios";


export const getFriends= async (userId: string): Promise<any> => {
    const { data } = await axios.post('http://localhost:5000/friends/find', { userId });
    return data;
}

export const addFriend = async (userId: string, friendId: string): Promise<any> => {
    const { data } = await axios.post('http://localhost:5000/friends/create', { userId, friendId });
    return data;
}