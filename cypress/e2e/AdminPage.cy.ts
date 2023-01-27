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
    PUT_METHOD,
    AUTHORIZATION_KEY,
    TESTING_TOKEN,
    LOCAL_HOST,
    ADD_STATION_BY_STATION_KEY_API_ROUTE,
    ADD_STATION_FETCH_ALIAS,
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
    getTheBearerToken,
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

        cy.intercept({
            method: PUT_METHOD,
            url: ADD_STATION_BY_STATION_KEY_API_ROUTE,
            hostname: LOCAL_HOST,
        }).as(ADD_STATION_FETCH_ALIAS)

        visitRoute(ADMIN_ROUTE)
        checkComponentNotExistByTestId(ADD_STATION_KEY_TEST_ID)
        getComponentByTestId(ADD_STATION_TEST_ID)
            .click()
        checkComponentExistByTestId(ADD_STATION_KEY_TEST_ID)

        typeWithTestId(ADD_STATION_KEY_TEST_ID, THIRD_STATION_STATION_KEY) 

        checkComponentExistByTestId(SUBMIT_ADD_STATION_KEY_TEST_ID)
        getComponentByTestId(SUBMIT_ADD_STATION_KEY_TEST_ID)
            .click()

        cy.wait([`@${ADD_STATION_FETCH_ALIAS}`])
            .then(intercept => {
                expect(intercept.request.headers[AUTHORIZATION_KEY]).to.equal(getTheBearerToken(TESTING_TOKEN))
                expect(intercept.request.body.stationKey).to.equal(THIRD_STATION_STATION_KEY)
            })
    })
})
