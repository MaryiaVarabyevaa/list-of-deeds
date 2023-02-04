export interface IList {
    _id: string,
    list: string,
    isDeleted: boolean,
    isCompleted: boolean,
    userId: string
}

export interface ITodoList {
    task: string,
    id: string,
    completed: boolean
}

export interface IListState {
    todoList: ITodoList[],
    sortCriteria: string;
}

export enum ListActionTypes {
    SET_TODO_LIST= 'SET_TODO_LIST',
    ADD_TODO='ADD_TODO',
    SORT_TODO = 'SORT_TODO',
    UPDATE_TODO = 'UPDATE_TODO',
    TOGGLE_COMPLETED = 'TOGGLE_COMPLETED'
}
