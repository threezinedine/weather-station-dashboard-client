import {
    typeWithTestId,
    checkTextExist,
    checkTextNotExist,
    getComponentByTestId, 
} from "../utils"


describe("Login page testing", () => {
    it("should have the login page", () => {
        cy.visit("http://localhost:3000/login")

        typeWithTestId("username", "thre")
        checkTextExist("Username must have more than 5 characters.")

        typeWithTestId("username", "threezinedinewithfirstteestinadsfresult")
        checkTextNotExist("Username must have more than 5 characters.")
        checkTextExist("Username must have less than 20 characters.")

        typeWithTestId("username", "threez!nedine")
        checkTextNotExist("Username must have less than 20 characters.")

        checkTextExist("Username cannot contain the specical characters.")
        
        typeWithTestId("username", "threezinedine")

        checkTextNotExist("Username cannot contain the specical characters.")

        typeWithTestId("password", "thre")
        checkTextExist("Password must have more than 5 characters.")

        typeWithTestId("password", "threezinedinewithfirstteestinadsfresult")
        checkTextNotExist("Password must have more than 5 characters.")
        checkTextExist("Password must have less than 20 characters.")

        typeWithTestId("password", "threez!nedine")
        checkTextNotExist("Password must have less than 20 characters.")

        checkTextExist("Password cannot contain the specical characters.")
        
        typeWithTestId("password", "threezinedine")

        checkTextNotExist("Password cannot contain the specical characters.")
        getComponentByTestId("submitBtn")
            .click()
    })
})
