import { 
    ErrorActionType,
    AddErrorAction,
    PopErrorAction,
    AddNotificationAction,
    PopNotificationAction,
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


export const addNotificationAction = (notification: string): AddNotificationAction => {
    return {
        type: ErrorActionType.ADD_NOTIFICATION_ACTION,
        payload: notification,
    }
}


export const popNotificationAction = (): PopNotificationAction => {
    return {
        type: ErrorActionType.POP_NOTIFICATION_ACTION,
    }
}
