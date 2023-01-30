import { 
    Action,
} from "redux"


export enum ErrorActionType {
    ADD_ERROR_ACTION = "Add Error Action",
    POP_ERROR_ACTION = "Pop Error Action",
    ADD_NOTIFICATION_ACTION = "Add Notification Action",
}


export interface AddErrorAction extends Action {
    type: ErrorActionType.ADD_ERROR_ACTION
    payload: string
}


export interface PopErrorAction extends Action {
    type: ErrorActionType.POP_ERROR_ACTION
}


export interface AddNotificationAction extends Action {
    type: ErrorActionType.ADD_NOTIFICATION_ACTION
    payload: string
}


export type ErrorAction = AddErrorAction | PopErrorAction | AddNotificationAction
