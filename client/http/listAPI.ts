import {IList} from "@/types/list";
import {$host} from "@/http/service";

export const getList = async (userId: string): Promise<IList[]> => {
    const { data } = await $host.post('list/find', { userId });
    return data;
}

export const createItem = async (userId: string, list: string): Promise<IList> => {
    const { data } = await $host.post('list/create', { userId, list });
    return data;
}

export const updateItem = async (id: string, list: string): Promise<IList> => {
    const { data } = await $host.post('list/update', { id, list});
    return data;
}

export const completeItem = async (id: string, isCompleted: boolean): Promise<IList> => {
    const { data } = await $host.post('list/complete', { id, isCompleted });
    return data;
}

export const deleteItem = async (id: string): Promise<IList> => {
    const { data } = await $host.post('list/delete', { id });
    return data;
}