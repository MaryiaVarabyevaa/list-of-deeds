import {IUserState, ListActionTypes} from "@/types/user";
import {IAction} from "@/types/action";
import {IListState} from "@/types/list";

const initialState: IUserState = {
   userId: '',
   isNewUser: true,
};

export const userReducer = (state = initialState, action: IAction): IUserState => {
    switch (action.type) {
        case ListActionTypes.ADD_USER:
            return {
                ...state,
                userId: action.payload.userId,
                isNewUser: action.payload.isNewUser
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