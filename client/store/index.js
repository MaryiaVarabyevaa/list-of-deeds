import {createStore} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension';
import {userReducer} from "@/store/userStore";


export const store = createStore(userReducer, composeWithDevTools())