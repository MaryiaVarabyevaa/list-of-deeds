import {createStore} from 'redux'
import {userReducer} from "@/store/userStore";
import {composeWithDevTools} from "redux-devtools-extension";
import {persistReducer, persistStore} from 'redux-persist'
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage
}

const persistedReducer = persistReducer(persistConfig, userReducer);

export let store = createStore(persistedReducer, composeWithDevTools())
export let persistor = persistStore(store)

