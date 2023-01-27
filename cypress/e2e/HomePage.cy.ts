import { 
    HOME_ROUTE,
    LOGIN_ERROR_MESSAGE,
    LOGIN_ROUTE,
    LOGOUT_DATA_TEST_ID,
    SMALL_WAITING_TIME,
    SESSION_EXPIRED_ERROR_MESSAGE,
} from "../constants"
import {
    visitRoute,
    validateRoute,
    setupValidToken,
    getComponentByTestId,
    setupInvalidToken,
    checkTextExist,
} from "../utils"


describe("Home page testing", () => {
    it("should navigate to the login page at the first time try to run the home page", () => {
        visitRoute(HOME_ROUTE)

        validateRoute(LOGIN_ROUTE)
    })

    it("should not navigate to the login page when the token is validated", () => {
        setupValidToken()
        visitRoute(HOME_ROUTE)
        cy.wait(SMALL_WAITING_TIME)
            .then(() => {
                validateRoute(HOME_ROUTE)
            })
    })

    it("should navigate to the login page and cannot access into the home page again when click the log out button", () => {
        setupValidToken()
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

    it("should navigate to the login page when the token is not validated", () => {
        setupInvalidToken()
        visitRoute(HOME_ROUTE)

        cy.wait(SMALL_WAITING_TIME)
            .then(() => {
                validateRoute(LOGIN_ROUTE)
            })

        checkTextExist(SESSION_EXPIRED_ERROR_MESSAGE)
    })
})
