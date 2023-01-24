import {
    getComponentByTestId, 
} from "../utils"


describe("Login page testing", () => {
    it("should have the login page", () => {
        cy.visit("http://localhost:3000/login")
        
        getComponentByTestId("username")
            .type("threezinedine")

        getComponentByTestId("password")
            .type("threezinedine")

        getComponentByTestId("loginBtn")
            .click()
    })
})
