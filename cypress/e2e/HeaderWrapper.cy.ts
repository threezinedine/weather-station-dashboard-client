import {
    setupValidToken,
    visitRoute,
    getComponentByTestId,
    validateRoute,
} from '../utils'
import { 
    LOGIN_ROUTE,
    HOME_ROUTE,
    LOGOUT_DATA_TEST_ID,
    SMALL_WAITING_TIME,
} from '../constants'


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
