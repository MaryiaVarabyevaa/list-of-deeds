import { IListState, ListActionTypes } from "@/types/list";
import {IAction} from "@/types/action";

const initialState: IListState = {
    todoList: [],
    sortCriteria: "All",
};


export const listReducer = (state = initialState, action: IAction): IListState => {

    switch (action.type) {
        case ListActionTypes.SET_TODO_LIST:
            return {
                ...state,
                todoList: action.payload
            }
        case ListActionTypes.ADD_TODO:
            return {
                ...state,
                todoList: [...state.todoList, {
                    task: action.payload.task,
                    id: action.payload.id,
                    completed: false,
                }]
            }
        case ListActionTypes.SORT_TODO:
            return {
                ...state,
                sortCriteria: action.payload
            }
        case ListActionTypes.UPDATE_TODO:
            const { id, task } = action.payload;
            const index = state.todoList.findIndex((todo) => todo.id === id);
            state.todoList[index].task = task;
            return {
                ...state,
            }
        case ListActionTypes.TOGGLE_COMPLETED:
            const { taskId } = action.payload;
            const indexA = state.todoList.findIndex((todo) => todo.id === taskId);
            state.todoList[indexA].completed = !state.todoList[indexA].completed;
            return {
                ...state,
            }
        default:
            return state;
    }
}

//todo: изменить тип payload
export const addTodoAction = (payload: any): IAction => {
    return {
        type: ListActionTypes.ADD_TODO,
        payload: payload
    }
}

export const setTodoAction = (payload: any): IAction => {
    return {
        type: ListActionTypes.SET_TODO_LIST,
        payload: payload
    }
}

export const sortTodoAction = (payload: any): IAction => {
    return {
        type: ListActionTypes.SORT_TODO,
        payload: payload
    }
}

export const updateTodoAction = (payload: any): IAction => {
    return {
        type: ListActionTypes.UPDATE_TODO,
        payload: payload
    }
}

export const toggleAction = (payload: any): IAction => {
    return {
        type: ListActionTypes.TOGGLE_COMPLETED,
        payload: payload
    }
}