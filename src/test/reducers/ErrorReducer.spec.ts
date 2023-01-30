import ErrorReducer, {
    ErrorState,
} from "stores/Error"
import { 
    addErrorAction,
    popErrorAction,
} from "stores/Error/actions"


describe("ErrorReducer test", () => {
    const firstErrorMessage = "Login error."
    const secondErrorMessage = "Register error."

    it("should have the errorMessage inside the errorMessages list when the errorMessage is added.", () => {
        const initState: ErrorState = {
            errorMessages: [],
            notifications: [],
        } 
        const newState = ErrorReducer(initState, addErrorAction(firstErrorMessage))

        expect(newState.errorMessages).toStrictEqual([firstErrorMessage])
    })

    it("should have the two errorMessages in order inside the errorMessages list when the two errorMessages is added.", () => {
        const initState: ErrorState = {
            errorMessages: [],
            notifications: [],
        } 
        const newState = ErrorReducer(initState, addErrorAction(firstErrorMessage))
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
        const initState: ErrorState = {
            errorMessages: [],
            notifications: [],
        } 

        const newState = ErrorReducer(initState, popErrorAction())

        expect(newState.errorMessages).toStrictEqual([])
    })
})
