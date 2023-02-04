import { createStore } from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension';
import {listReducer} from "./listStore";



export const store = createStore(listReducer, composeWithDevTools())