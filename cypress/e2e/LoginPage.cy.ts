import {
    visitRoute,
    typeWithTestId,
    checkTextExist,
    checkTextNotExist,
    getComponentByTestId,
    validateRoute,
    setupValidUsernamePassword,
    setupInvalidUsernamePassword, 
} from "../utils"
import {
    LOGIN_ROUTE,
    USERNAME_DATA_TEST_ID,
    PASSWORD_DATA_TEST_ID,
    SUBMIT_BUTTON_DATA_TEST_ID,
    TEST_USERNAME_WITH_LESS_THAN_FIVE_CHARACTERS,
    USERNAME_MUST_HAVE_MORE_THAN_FIVE_CHARACTERS_ERROR_MESSAGE,
    TEST_USERNAME_WITH_MORE_THAN_TWENTY_CHARACTERS,
    USERNAME_MUST_HAVE_LESS_THAN_TWENTY_CHARACTERS_ERROR_MESSAGE,
    TEST_USERNAME_WITH_SPECIAL_CHARACTER,
    USERNAME_CANNOT_CONTAIN_THE_SPECIAL_CHARACTERS,
    TEST_USERNAME,
    TEST_PASSWORD_WITH_LESS_THAN_FIVE_CHARACTERS,
    PASSWORD_MUST_HAVE_MORE_THAN_FIVE_CHARACTERS_ERROR_MESSAGE,
    TEST_PASSWORD_WITH_MORE_THAN_TWENTY_CHARACTERS,
    PASSWORD_MUST_HAVE_LESS_THAN_TWENTY_CHARACTERS_ERROR_MESSAGE,
    TEST_PASSWORD_WITH_SPECIAL_CHARACTER,
    PASSWORD_CANNOT_CONTAIN_THE_SPECIAL_CHARACTERS,
    TEST_PASSWORD,
    LOGIN_ERROR_MESSAGE,
    WAITING_TIME,
    SMALL_WAITING_TIME,
    HOME_ROUTE,
} from "../constants"


describe("Login page testing", () => {
    it("should have the login page", () => {
        visitRoute(LOGIN_ROUTE)

        typeWithTestId(USERNAME_DATA_TEST_ID, TEST_USERNAME_WITH_LESS_THAN_FIVE_CHARACTERS)
        checkTextExist(USERNAME_MUST_HAVE_MORE_THAN_FIVE_CHARACTERS_ERROR_MESSAGE)

        typeWithTestId(USERNAME_DATA_TEST_ID, TEST_USERNAME_WITH_MORE_THAN_TWENTY_CHARACTERS)
        checkTextNotExist(USERNAME_MUST_HAVE_MORE_THAN_FIVE_CHARACTERS_ERROR_MESSAGE)
        checkTextExist(USERNAME_MUST_HAVE_LESS_THAN_TWENTY_CHARACTERS_ERROR_MESSAGE)

        typeWithTestId(USERNAME_DATA_TEST_ID, TEST_USERNAME_WITH_SPECIAL_CHARACTER)
        checkTextNotExist(USERNAME_MUST_HAVE_MORE_THAN_FIVE_CHARACTERS_ERROR_MESSAGE)
        checkTextExist(USERNAME_CANNOT_CONTAIN_THE_SPECIAL_CHARACTERS)
        
        typeWithTestId(USERNAME_DATA_TEST_ID, TEST_USERNAME)
        checkTextNotExist(USERNAME_CANNOT_CONTAIN_THE_SPECIAL_CHARACTERS)

        typeWithTestId(PASSWORD_DATA_TEST_ID, TEST_PASSWORD_WITH_LESS_THAN_FIVE_CHARACTERS)
        checkTextExist(PASSWORD_MUST_HAVE_MORE_THAN_FIVE_CHARACTERS_ERROR_MESSAGE)

        getComponentByTestId(SUBMIT_BUTTON_DATA_TEST_ID)
            .click()

        checkTextExist(LOGIN_ERROR_MESSAGE)
        cy.wait(WAITING_TIME)
            .then(() => {
                checkTextNotExist(LOGIN_ERROR_MESSAGE)
            })

        typeWithTestId(PASSWORD_DATA_TEST_ID, TEST_PASSWORD_WITH_MORE_THAN_TWENTY_CHARACTERS)
        checkTextNotExist(PASSWORD_MUST_HAVE_MORE_THAN_FIVE_CHARACTERS_ERROR_MESSAGE)
        checkTextExist(PASSWORD_MUST_HAVE_LESS_THAN_TWENTY_CHARACTERS_ERROR_MESSAGE)

        typeWithTestId(PASSWORD_DATA_TEST_ID, TEST_PASSWORD_WITH_SPECIAL_CHARACTER)
        checkTextNotExist(PASSWORD_MUST_HAVE_LESS_THAN_TWENTY_CHARACTERS_ERROR_MESSAGE)
        checkTextExist(PASSWORD_CANNOT_CONTAIN_THE_SPECIAL_CHARACTERS)
        
        typeWithTestId(PASSWORD_DATA_TEST_ID, TEST_PASSWORD)
        checkTextNotExist(PASSWORD_CANNOT_CONTAIN_THE_SPECIAL_CHARACTERS)

        getComponentByTestId(SUBMIT_BUTTON_DATA_TEST_ID)
            .click()
    })

    it("should can navigate to the home page when loggin successfully", () => {
        setupValidUsernamePassword()
        visitRoute(LOGIN_ROUTE)

        typeWithTestId(USERNAME_DATA_TEST_ID, TEST_USERNAME)
        typeWithTestId(PASSWORD_DATA_TEST_ID, TEST_PASSWORD)
        
        getComponentByTestId(SUBMIT_BUTTON_DATA_TEST_ID)
            .click()

        cy.wait(SMALL_WAITING_TIME)
            .then(() => {
                validateRoute(HOME_ROUTE) 
            })
    })

    it("should not navigate to the home page and display the login error message when the login information is not valid", () => {
        setupInvalidUsernamePassword() 
        visitRoute(LOGIN_ROUTE)

        typeWithTestId(USERNAME_DATA_TEST_ID, TEST_USERNAME)
        typeWithTestId(PASSWORD_DATA_TEST_ID, TEST_PASSWORD)
        
        getComponentByTestId(SUBMIT_BUTTON_DATA_TEST_ID)
            .click()

        cy.wait(SMALL_WAITING_TIME)
            .then(() => {
                validateRoute(LOGIN_ROUTE) 
            })

        checkTextExist(LOGIN_ERROR_MESSAGE)
    })
})
