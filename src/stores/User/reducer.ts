import { 
    UserAction, UserActionType,
} from "./constants"
import UserState from "./UserState"


const initialState: UserState = {
    username: ""
}

const reducer = (state: UserState = initialState, action: UserAction): UserState => {
    switch(action.type) {
    case UserActionType.SAVE_USERNAME:
        return {
            ...state,
            username: action.payload,
        }
    default:
        return state
    }
}


export default reducer
