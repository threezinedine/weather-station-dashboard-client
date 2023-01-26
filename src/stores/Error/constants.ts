import { 
    Action,
} from "redux"


export enum ErrorActionType {
    ADD_ERROR_ACTION = "Add Error Action",
    POP_ERROR_ACTION = "Pop Error Action",
}


export interface AddErrorAction extends Action {
    type: ErrorActionType.ADD_ERROR_ACTION
    payload: string
}


export interface PopErrorAction extends Action {
    type: ErrorActionType.POP_ERROR_ACTION
}


export type ErrorAction = AddErrorAction | PopErrorAction
