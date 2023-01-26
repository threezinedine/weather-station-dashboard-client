import ErrorReducer, {
    ErrorState,
} from "stores/Error"
import { 
    addErrorAction,
} from "stores/Error/actions"


describe('ErrorReducer test', () => {
    it('should have the errorMessage inside the errorMessages list when the errorMessage is added.', () => {
        const initState: ErrorState = {
            errorMessages: []
        } 
        const errorMessage = "Login error."

        const newState = ErrorReducer(initState, addErrorAction(errorMessage))

        expect(newState.errorMessages).toHaveLength(1)
        expect(newState.errorMessages[0]).toStrictEqual(errorMessage)
    })

    it('should have the two errorMessages in order inside the errorMessages list when the two errorMessages is added.', () => {
        const initState: ErrorState = {
            errorMessages: []
        } 
        const firstErrorMessage = "Login error."
        const secondErrorMessage = "Register error."

        const newState = ErrorReducer(initState, addErrorAction(firstErrorMessage))
        const finalState = ErrorReducer(newState, addErrorAction(secondErrorMessage))

        expect(finalState.errorMessages).toStrictEqual([firstErrorMessage, secondErrorMessage])
    })

    it('should have remove the first errorMessage when have 2 errorMessages are stored in the errorMessages.', () => {
        const firstErrorMessage = "Login error."
        const secondErrorMessage = "Register error."

        const initState: ErrorState = {
            errorMessages: [firstErrorMessage, secondErrorMessage]
        } 

        const newState = ErrorReducer(initState, popErrorAction())

        expect(newState.errorMessages).toStrictEqual([secondErrorMessage])
    })
})
