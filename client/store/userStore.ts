import {IUserState, ListActionTypes} from "@/types/user";
import {IAction} from "@/types/action";

const initialState: IUserState = {
   userId: '',
};

export const userReducer = (state = initialState, action: IAction): IUserState => {
    switch (action.type) {
        case ListActionTypes.ADD_USER:
            return {
                ...state,
                userId: action.payload.userId,
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
