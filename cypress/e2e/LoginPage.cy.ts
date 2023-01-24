describe("Login page testing", () => {
    it("should have the login page", () => {
        cy.visit("http://localhost:3000/login")
        
        cy.contains("[data-testid=\"username\"]")
            .type("threezinedine")

        cy.contains("[data-testid=\"password\"]")
            .type("threezinedine")

        cy.contains("[data-testid=\"login\"]")
            .click()
    })
})
