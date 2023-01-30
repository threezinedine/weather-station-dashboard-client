import ErrorReducer, {
    ErrorState,
} from "stores/Error"
import { 
    addErrorAction,
    popErrorAction,
    addNotificationAction,
    popNotificationAction,
} from "stores/Error/actions"


describe("ErrorReducer test", () => {
    const firstErrorMessage = "Login error."
    const secondErrorMessage = "Register error."
    const notification = "Notification"
    const emptyState: ErrorState = {
        errorMessages: [],
        notifications: [],
    } 

    it("should have the errorMessage inside the errorMessages list when the errorMessage is added.", () => {
        const newState = ErrorReducer(emptyState, addErrorAction(firstErrorMessage))

        expect(newState.errorMessages).toStrictEqual([firstErrorMessage])
    })

    it("should have the two errorMessages in order inside the errorMessages list when the two errorMessages is added.", () => {
        const newState = ErrorReducer(emptyState, addErrorAction(firstErrorMessage))
        const finalState = ErrorReducer(newState, addErrorAction(secondErrorMessage))

        expect(finalState.errorMessages).toStrictEqual([firstErrorMessage, secondErrorMessage])
    })

    it("should have remove the first errorMessage when have 2 errorMessages are stored in the errorMessages.", () => {
        const initState: ErrorState = {
            errorMessages: [firstErrorMessage, secondErrorMessage],
            notifications: [],
        } 

        const newState = ErrorReducer(initState, popErrorAction())

        expect(newState.errorMessages).toStrictEqual([secondErrorMessage])
    })

    it("should do nothing when no error message in the reducer", () => {
        const newState = ErrorReducer(emptyState, popErrorAction())

        expect(newState.errorMessages).toStrictEqual([])
    })

    it("should add the notification into the notifications when the action is called.", () => {
        const newState = ErrorReducer(emptyState, addNotificaionAction(notification))

        expect(newState.notifications).toStrictEqual([notification])
    })

    it("should add the notification into the notifications when the action is called.", () => {
        const newState = ErrorReducer(emptyState, addNotificationAction(notification))
        const finalState = ErrorReducer(newState, popNotificationAction())

        expect(newState.notifications).toStrictEqual([])
    })
})
