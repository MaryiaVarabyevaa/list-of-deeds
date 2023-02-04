import {IUserState, ListActionTypes} from "@/types/user";
import {IAction} from "@/types/action";
import {IListState} from "@/types/list";

const initialState: IUserState = {
   userId: '',
};

export const userReducer = (state = initialState, action: IAction): IUserState => {
    switch (action.type) {
        case ListActionTypes.ADD_USER:
            localStorage.setItem('userId', action.payload.userId);
            return {
                ...state,
                userId: action.payload.userId,
            }
        case ListActionTypes.RESTORE_FROM_STORAGE:
            const userId = localStorage.getItem('userId');
            return {
                ...state,
                userId: userId? userId : ''
            }
        default:
            return state;
    }
}

export const addUserAction = (payload: IUserState): IAction => {
    return {
        type: ListActionTypes.ADD_USER,
        payload: payload
    }
}

export const restoreAction = (): IAction => {
    return {
        type: ListActionTypes.RESTORE_FROM_STORAGE,
    }
}