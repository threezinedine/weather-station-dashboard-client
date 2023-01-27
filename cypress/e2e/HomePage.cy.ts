import { 
    HOME_ROUTE,
    LOGIN_ROUTE,
    LOGOUT_DATA_TEST_ID,
    SMALL_WAITING_TIME,
} from "../constants"
import {
    visitRoute,
    validateRoute,
    setupValidateToken,
    getComponentByTestId,
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

    it("should navigate to the login page and cannot access into the home page again when click the log out button", () => {
        setupValidateToken()
        visitRoute(HOME_ROUTE)
        
        getComponentByTestId(LOGOUT_DATA_TEST_ID)
            .click()

        cy.wait(SMALL_WAITING_TIME)
            .then(() => {
                validateRoute(LOGIN_ROUTE)
            })

        visitRoute(HOME_ROUTE)

        cy.wait(SMALL_WAITING_TIME)
            .then(() => {
                validateRoute(LOGIN_ROUTE)
            })
    })
})
