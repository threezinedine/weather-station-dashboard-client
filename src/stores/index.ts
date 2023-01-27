import {
    createStore,
    combineReducers,
} from "redux"

import ErrorReducer, {
    ErrorAction,
    ErrorState,
} from "./Error"
import UserReducer, {
    UserAction,
    UserState,
} from "./User"


export type StoreAction = ErrorAction | UserState
export type StoreState = {
    ErrorReducer: ErrorState,
    UserReducer: UserState,
}


const store = createStore(combineReducers({
    ErrorReducer,
    UserReducer,
}))


export default store
