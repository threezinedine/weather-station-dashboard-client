import { 
    HOME_ROUTE,
    LOGIN_ROUTE,
    SMALL_WAITING_TIME,
} from "../constants"
import {
    visitRoute,
    validateRoute,
    setupValidateToken,
} from "../utils"


describe("Home page testing", () => {
    it("should navigate to the login page at the first time try to run the home page", () => {
        visitRoute(HOME_ROUTE)

        validateRoute(LOGIN_ROUTE)
    })

    it("should not navigate to the login page when the token is validated", () => {
        setupValidateToken()
        visitRoute(HOME_ROUTE)
        cy.wait(SMALL_WAITING_TIME)
            .then(() => {
                validateRoute(HOME_ROUTE)
            })
    })
})
