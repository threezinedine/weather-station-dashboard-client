import {
    visitRoute,
    typeWithTestId,
    checkTextExist,
    checkTextNotExist,
    validateRoute,
    setupValidUsernamePassword,
    setupInvalidUsernamePassword,
    getComponentByText, 
} from "../utils"
import {
    LOGIN_ROUTE,
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
    HOME_ROUTE,
    LOGIN_POST_ALIAS,
    SMALL_WAITING_TIME,
} from "../constants"
import { 
    USERNAME_DATA_TEST_ID,
    PASSWORD_DATA_TEST_ID,
    LOGIN_SUBMIT_LABEL,
    ERROR_MESSAGE_TIME_OUT,
    LOGIN_SUCCESSFULLY_MESSAGE,
} from "const"


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

        getComponentByText(LOGIN_SUBMIT_LABEL)
            .click()

        checkTextExist(LOGIN_ERROR_MESSAGE)
        cy.wait(ERROR_MESSAGE_TIME_OUT)
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

        getComponentByText(LOGIN_SUBMIT_LABEL)
            .click()
    })

    it("should can navigate to the home page when loggin successfully", () => {
        setupValidUsernamePassword()
        visitRoute(LOGIN_ROUTE)

        typeWithTestId(USERNAME_DATA_TEST_ID, TEST_USERNAME)
        typeWithTestId(PASSWORD_DATA_TEST_ID, TEST_PASSWORD)
        
        getComponentByText(LOGIN_SUBMIT_LABEL)
            .click()

        checkTextExist(LOGIN_SUCCESSFULLY_MESSAGE)

        cy.wait(SMALL_WAITING_TIME)
            .then(() => {
                validateRoute(HOME_ROUTE) 
            })

        cy.wait(`@${LOGIN_POST_ALIAS}`)
            .then(intercept => {
                console.log(intercept)
                expect(intercept.request.body).to.have.string(USERNAME_DATA_TEST_ID)
                expect(intercept.request.body).to.have.string(PASSWORD_DATA_TEST_ID)
                expect(intercept.request.body).to.have.string(TEST_USERNAME)
                expect(intercept.request.body).to.have.string(TEST_PASSWORD)
            })
    })

    it("should not navigate to the home page and display the login error message when the login information is not valid", () => {
        setupInvalidUsernamePassword() 
        visitRoute(LOGIN_ROUTE)

        typeWithTestId(USERNAME_DATA_TEST_ID, TEST_USERNAME)
        typeWithTestId(PASSWORD_DATA_TEST_ID, TEST_PASSWORD)
        
        getComponentByText(LOGIN_SUBMIT_LABEL)
            .click()

        cy.wait(SMALL_WAITING_TIME)
            .then(() => {
                validateRoute(LOGIN_ROUTE) 
            })

        checkTextExist(LOGIN_ERROR_MESSAGE)
    })
})
