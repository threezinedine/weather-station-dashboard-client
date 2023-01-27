import {
    ADMIN_ROUTE, 
    FIRST_STATION_STATION_POSITION,
    FIRST_STATION_STATION_NAME, 
    SECOND_STATION_STATION_NAME, 
    SECOND_STATION_STATION_POSITION,
    FIRST_STATION_PAGE_ROUTE,
    ADD_STATION_TEST_ID,
    ADD_STATION_KEY_TEST_ID,
    THIRD_STATION_STATION_KEY,
    SUBMIT_ADD_STATION_KEY_TEST_ID,
} from "../constants"
import {
    checkTextExist,
    getComponentByText,
    getComponentByTestId,
    setupAllStation,
    setupValidToken,
    validateRoute,
    visitRoute,
    checkComponentNotExistByTestId,
    checkComponentExistByTestId,
    typeWithTestId,
} from "../utils"


describe("Admin page testing", () => {
    it("should display all the station that the user have", () => {
        setupValidToken()
        setupAllStation()

        visitRoute(ADMIN_ROUTE)

        checkTextExist(FIRST_STATION_STATION_NAME)
        checkTextExist(FIRST_STATION_STATION_POSITION)
        checkTextExist(SECOND_STATION_STATION_NAME)
        checkTextExist(SECOND_STATION_STATION_POSITION)
    })

    it("should navigate to the station's page when click into the station name and position", () => {
        setupValidToken()
        setupAllStation()

        visitRoute(ADMIN_ROUTE)
        getComponentByText(FIRST_STATION_STATION_NAME)
            .click()
        validateRoute(FIRST_STATION_PAGE_ROUTE)
    })

    it("should contain the add new station button and have the input tag to insert the station's key into it", () => {
        setupValidToken()
        setupAllStation()

        visitRoute(ADMIN_ROUTE)
        checkComponentNotExistByTestId(ADD_STATION_KEY_TEST_ID)
        getComponentByTestId(ADD_STATION_TEST_ID)
            .click()
        checkComponentExistByTestId(ADD_STATION_KEY_TEST_ID)

        typeWithTestId(ADD_STATION_KEY_TEST_ID, THIRD_STATION_STATION_KEY) 

        checkComponentExistByTestId(SUBMIT_ADD_STATION_KEY_TEST_ID)
    })
})
