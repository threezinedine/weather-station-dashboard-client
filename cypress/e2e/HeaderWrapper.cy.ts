import {
    setupValidToken,
    visitRoute,
    getComponentByTestId,
    validateRoute,
    checkComponentExistByTestId,
    setupAllStation,
    setupFreeAPIStationLatestRecord,
    checkTextNotExist,
    checkTextExist,
    getComponentByText,
} from "../utils"
import { 
    LOGIN_ROUTE,
    HOME_ROUTE,
    SMALL_WAITING_TIME,
    ADMIN_ROUTE,
} from "../constants"
import { 
    BRAND_DATA_TEST_ID,
    AVATAR_TEST_ID,
    LOGOUT_BUTTON_LABEL,
    USER_BUTTON_LABEL,
} from "const"


describe("HeaderWrapper testing", () => {
    it("should not have the logout or user until click in avatar.", () => {
        setupValidToken()
        visitRoute(HOME_ROUTE)

        checkComponentExistByTestId(AVATAR_TEST_ID)
        checkTextNotExist(LOGOUT_BUTTON_LABEL)
        checkTextNotExist(USER_BUTTON_LABEL)

        getComponentByTestId(AVATAR_TEST_ID)
            .click()

        checkTextExist(LOGOUT_BUTTON_LABEL)
        checkTextExist(USER_BUTTON_LABEL)
    })

    it("should hide the user and log out when 1 of them is clicked", () => {
        setupValidToken()
        setupAllStation()
        setupFreeAPIStationLatestRecord()
        visitRoute(HOME_ROUTE)

        getComponentByTestId(AVATAR_TEST_ID)
            .click()

        getComponentByText(USER_BUTTON_LABEL)
            .click()

        checkTextNotExist(LOGOUT_BUTTON_LABEL)
        checkTextNotExist(USER_BUTTON_LABEL)
    })

    it("should navigate to the login page and cannot access into the home page again when click the log out button", () => {
        setupValidToken()
        setupAllStation()
        setupFreeAPIStationLatestRecord()

        visitRoute(HOME_ROUTE)
        
        getComponentByTestId(AVATAR_TEST_ID)
            .click()

        getComponentByText(LOGOUT_BUTTON_LABEL)
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
        setupAllStation()
        setupFreeAPIStationLatestRecord()

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
        setupAllStation()
        setupFreeAPIStationLatestRecord()

        visitRoute(HOME_ROUTE)

        getComponentByTestId(AVATAR_TEST_ID)
            .click()
        getComponentByText(USER_BUTTON_LABEL)
            .click()

        cy.wait(SMALL_WAITING_TIME)
            .then(() => {
                validateRoute(ADMIN_ROUTE)
            })
    })
})
