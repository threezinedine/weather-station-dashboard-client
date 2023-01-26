import { 
    ErrorActionType,
    AddErrorAction,
    PopErrorAction,
} from "./constants"


export const addErrorAction = (errorMessage: string): AddErrorAction => {
    return {
        type: ErrorActionType.ADD_ERROR_ACTION,
        payload: errorMessage,
    }
}


export const popErrorAction = (): PopErrorAction => {
    return {
        type: ErrorActionType.POP_ERROR_ACTION
    }
}
