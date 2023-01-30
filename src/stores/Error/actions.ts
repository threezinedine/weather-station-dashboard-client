import { 
    ErrorActionType,
    AddErrorAction,
    PopErrorAction,
    AddNotificationAction,
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


export const addNotificaionAction = (notification: string): AddNotificationAction => {
    return {
        type: ErrorActionType.ADD_NOTIFICATION_ACTION,
        payload: notification,
    }
}
