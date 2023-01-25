import {
    visitRoute,
    typeWithTestId,
    checkTextExist,
    checkTextNotExist,
    getComponentByTestId, 
} from "../utils"
import {
    REGISTER_ROUTE,
    USERNAME_DATA_TEST_ID,
    PASSWORD_DATA_TEST_ID,
    VALID_PASSWORD_DATA_TEST_ID,
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
    TEST_VALID_PASSWORD_WITH_NOT_MATCH_WITH_PASSWORD,
    VALID_PASSWORD_DOES_NOT_MATCH_ERROR_MESSAGE,
    TEST_PASSWORD,
    LOGIN_ERROR_MESSAGE,
    WAITING_TIME,
} from "../constants"


describe("Register page testing", () => {
    it("should have the register page", () => {
        visitRoute(REGISTER_ROUTE)

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

        typeWithTestId(VALID_PASSWORD_DATA_TEST_ID, TEST_VALID_PASSWORD_WITH_NOT_MATCH_WITH_PASSWORD)
        checkTextExist(VALID_PASSWORD_DOES_NOT_MATCH_ERROR_MESSAGE)

        typeWithTestId(VALID_PASSWORD_DATA_TEST_ID, TEST_PASSWORD)
        checkTextNotExist(VALID_PASSWORD_DOES_NOT_MATCH_ERROR_MESSAGE)

        getComponentByTestId(SUBMIT_BUTTON_DATA_TEST_ID)
            .click()
    })
})
