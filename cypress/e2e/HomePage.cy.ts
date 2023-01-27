import { 
    HOME_ROUTE,
    LOGIN_ROUTE,
    SMALL_WAITING_TIME,
} from "../constants"
import {
    visitRoute,
} from "../utils"


describe("Home page testing", () => {
    it("should navigate to the login page at the first time try to run the home page", () => {
        visitRoute(HOME_ROUTE)

        cy.url().should("eq", LOGIN_ROUTE)
    })

    it("should not navigate to the login page when the token is validated", () => {
        cy.intercept({
            method: "GET",
            url: "/users/validate",
            hostname: "localhost",
        },
        {
            statusCode: 200,
        })
        window.localStorage.setItem("token_item", "testing_token")

        visitRoute(HOME_ROUTE)
        cy.wait(SMALL_WAITING_TIME)
            .then(() => {
                cy.url().should("eq", HOME_ROUTE)
            })
    })
})
