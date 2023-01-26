import { 
    Action,
} from "redux"


export enum ErrorActionType {
    ADD_ERROR_ACTION = "Add Error Action"
}


export interface AddErrorAction extends Action {
    type: ErrorActionType.ADD_ERROR_ACTION
    payload: string
}


export type ErrorAction = AddErrorAction
