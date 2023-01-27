import { 
    UserAction,
} from "./constants"
import UserState from "./UserState"


const initialState: UserState = {
    username: ""
}

const reducer = (state: UserState = initialState, action: UserAction): UserState => {
    switch(action.type) {
    default:
        return state
    }
}


export default reducer
