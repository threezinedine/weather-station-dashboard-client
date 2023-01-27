import { 
    SaveUsernameAction,
    UserAction,
    UserActionType,
} from "./constants"


export const saveUsernameAction = (username: string):SaveUsernameAction => {
    return {
        type: UserActionType.SAVE_USERNAME,
        payload: username,
    }
}
