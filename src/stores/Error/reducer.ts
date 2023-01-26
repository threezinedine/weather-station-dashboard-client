import ErrorState from "./ErrorState"
import { 
    ErrorAction, 
    ErrorActionType,
} from "./constants"


const initialState = {
    errorMessages: [],
}


const reducer = (state: ErrorState = initialState, action: ErrorAction): ErrorState => {
    switch(action.type) {
    case ErrorActionType.ADD_ERROR_ACTION:
        return {
            ...state,
            errorMessages: [...state.errorMessages, action.payload]
        }
    default:
        return state
    }
}


export default reducer
