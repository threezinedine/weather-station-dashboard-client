import { 
    Action,
} from "redux"


export enum UserActionType {
    SAVE_USERNAME = "Save username"
}


export interface SaveUsernameAction extends Action {
    type: UserActionType.SAVE_USERNAME
    payload: string
}


export type UserAction = SaveUsernameAction
