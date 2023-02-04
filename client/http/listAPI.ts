import axios from "axios";
import {IList} from "@/types/list";

export const getList = async (userId: string): Promise<IList[]> => {
    const { data } = await axios.post('http://localhost:5000/list/find', { userId });
    return data;
}

export const createItem = async (userId: string, list: string): Promise<IList> => {
    const { data } = await axios.post('http://localhost:5000/list/create', { userId, list });
    return data;
}

export const updateItem = async (id: string, list: string): Promise<IList> => {
    const { data } = await axios.post('http://localhost:5000/list/update', { id, list});
    return data;
}

export const completeItem = async (id: string, isCompleted: boolean): Promise<IList> => {
    const { data } = await axios.post('http://localhost:5000/list/complete', { id, isCompleted });
    return data;
}

export const deleteItem = async (id: string): Promise<IList> => {
    const { data } = await axios.post('http://localhost:5000/list/delete', { id });
    return data;
}