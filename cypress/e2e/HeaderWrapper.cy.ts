import {
    setupValidToken,
    visitRoute,
    getComponentByTestId,
    validateRoute,
    checkComponentExistByTestId,
    checkComponentNotExistByTestId,
} from "../utils"
import { 
    LOGIN_ROUTE,
    HOME_ROUTE,
    SMALL_WAITING_TIME,
    ADMIN_ROUTE,
} from "../constants"
import { 
    LOGOUT_BUTTON_TEST_ID,
    BRAND_DATA_TEST_ID,
    USER_DATA_TEST_ID,
    AVATAR_TEST_ID,
} from "const"


describe("HeaderWrapper testing", () => {
    it("should not have the logout or user until click in avatar.", () => {
        setupValidToken()
        visitRoute(HOME_ROUTE)

        checkComponentExistByTestId(AVATAR_TEST_ID)
        checkComponentNotExistByTestId(LOGOUT_BUTTON_TEST_ID)
        checkComponentNotExistByTestId(USER_DATA_TEST_ID)

        getComponentByTestId(AVATAR_TEST_ID)
            .click()

        checkComponentExistByTestId(LOGOUT_BUTTON_TEST_ID)
        checkComponentExistByTestId(USER_DATA_TEST_ID)
    })

    it("should hide the user and log out when 1 of them is clicked", () => {
        setupValidToken()
        visitRoute(HOME_ROUTE)

        getComponentByTestId(AVATAR_TEST_ID)
            .click()

        getComponentByTestId(USER_DATA_TEST_ID)
            .click()

        checkComponentNotExistByTestId(LOGOUT_BUTTON_TEST_ID)
        checkComponentNotExistByTestId(USER_DATA_TEST_ID)
    })

    it("should navigate to the login page and cannot access into the home page again when click the log out button", () => {
        setupValidToken()
        visitRoute(HOME_ROUTE)
        
        getComponentByTestId(AVATAR_TEST_ID)
            .click()

        getComponentByTestId(LOGOUT_BUTTON_TEST_ID)
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

    it("Should navigate to home page when the brand is clicked", () => {
        setupValidToken()
        visitRoute(HOME_ROUTE)

        getComponentByTestId(BRAND_DATA_TEST_ID)
            .click()

        cy.wait(SMALL_WAITING_TIME)
            .then(() => {
                validateRoute(HOME_ROUTE)
            })

        visitRoute(ADMIN_ROUTE)
        getComponentByTestId(BRAND_DATA_TEST_ID)
            .click()

        cy.wait(SMALL_WAITING_TIME)
            .then(() => {
                validateRoute(HOME_ROUTE)
            })
    })

    it("should contain the user data-testid and navigate to the admin page when click it", () => {
        setupValidToken()
        visitRoute(HOME_ROUTE)

        getComponentByTestId(AVATAR_TEST_ID)
            .click()
        getComponentByTestId(USER_DATA_TEST_ID)
            .click()

        cy.wait(SMALL_WAITING_TIME)
            .then(() => {
                validateRoute(ADMIN_ROUTE)
            })
    })
})
