describe("Login page testing", () => {
    it("should have the login page", () => {
        cy.visit("http://localhost:3000/login")
        
        cy.get("[data-testid=\"username\"]")
            .type("threezinedine")

        cy.get("[data-testid=\"password\"]")
            .type("threezinedine")

        cy.get("[data-testid=\"loginBtn\"]")
            .click()
    })
})
