import {
    createStore,
    combineReducers,
} from "redux"

import ErrorReducer, {
    ErrorAction,
    ErrorState,
} from "./Error"


export type StoreAction = ErrorAction
export type StoreState = {
    ErrorReducer: ErrorState
}


const store = createStore(combineReducers({
    ErrorReducer,
}))


export default store
