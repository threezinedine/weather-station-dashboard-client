import { 
    HOME_ROUTE,
    LOGIN_ROUTE,
} from "../constants"
import {
    visitRoute,
} from "../utils"


describe('Home page testing', () => {
    it('should navigate to the login page at the first time try to run the home page', () => {
        visitRoute(HOME_ROUTE)

        cy.url().should('eq', LOGIN_ROUTE)
    })
})
