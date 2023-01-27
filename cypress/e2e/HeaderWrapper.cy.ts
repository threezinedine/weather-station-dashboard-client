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
    BRAND_DATA_TEST_ID,
} from '../constants'


describe("HeaderWrapper testing", () => {
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

    it("Should navigate to brand when the brand is clicked", () => {
        setupValidToken()
        visitRoute(HOME_ROUTE)

        getComponentByTestId(BRAND_DATA_TEST_ID)
            .click()

        cy.wait(SMALL_WAITING_TIME)
            .then(() => {
                validateRoute(HOME_ROUTE)
            })
    })
})
