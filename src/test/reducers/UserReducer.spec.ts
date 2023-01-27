import UserReducer, {
    UserState,
} from "stores/User"
import {saveUsernameAction} from "stores/User/actions"


describe("Test UserReducer", () => {
    it("should have the username is set when call saveUsername", () => {
        const initialState: UserState = {
            username: ""
        }
        const username = "threezinedine"

        const newState = UserReducer(initialState, saveUsernameAction(username))

        expect(newState.username).toBe(username)
    })
})
