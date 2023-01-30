import ErrorState from "./ErrorState"
import { 
    ErrorAction, 
    ErrorActionType,
} from "./constants"


const initialState = {
    errorMessages: [],
    notifications: [],
}


const reducer = (state: ErrorState = initialState, action: ErrorAction): ErrorState => {
    switch(action.type) {
    case ErrorActionType.ADD_ERROR_ACTION:
        return {
            ...state,
            errorMessages: [...state.errorMessages, action.payload]
        }
    case ErrorActionType.POP_ERROR_ACTION:
        return {
            ...state,
            errorMessages: state.errorMessages.slice(1)
        }
    case ErrorActionType.ADD_NOTIFICATION_ACTION:
        return {
            ...state,
            notifications: [...state.notifications, action.payload],
        }
    default:
        return state
    }
}


export default reducer
