import { 
    ErrorActionType,
    AddErrorAction,
} from "./constants"


export const addErrorAction = (errorMessage: string): AddErrorAction => {
    return {
        type: ErrorActionType.ADD_ERROR_ACTION,
        payload: errorMessage,
    }
}
