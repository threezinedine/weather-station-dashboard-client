import { 
    HOME_ROUTE,
    LOGIN_ROUTE,
    SMALL_WAITING_TIME,
    SESSION_EXPIRED_ERROR_MESSAGE,
} from "../constants"
import {
    visitRoute,
    validateRoute,
    setupValidToken,
    setupInvalidToken,
    checkTextExist,
    setupFreeAPIStationLatestRecord,
    setupAllStation,
} from "../utils"


describe("AuthWrapper testing", () => {
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

    it("should navigate to the login page when the token is not validated", () => {
        setupInvalidToken()
        setupFreeAPIStationLatestRecord()
        setupAllStation()

        visitRoute(HOME_ROUTE)

        cy.wait(SMALL_WAITING_TIME)
            .then(() => {
                validateRoute(LOGIN_ROUTE)
            })

        checkTextExist(SESSION_EXPIRED_ERROR_MESSAGE)
    })
})
