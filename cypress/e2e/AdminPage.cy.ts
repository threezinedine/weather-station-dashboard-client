import {
    ADMIN_ROUTE, 
    FIRST_STATION_STATION_POSITION,
    FIRST_STATION_STATION_NAME, 
    SECOND_STATION_STATION_NAME, 
    SECOND_STATION_STATION_POSITION,
    FIRST_STATION_PAGE_ROUTE,
    THIRD_STATION_STATION_KEY,
    TESTING_TOKEN,
    ADD_STATION_FETCH_ALIAS,
    STATION_KEY_DOES_NOT_EXIST_ERROR_MESSAGE,
    TEST_USERNAME,
    TEST_PASSWORD_ADMIN_PAGE,
    SMALL_WAITING_TIME,
    THIRD_STATION_STATION_NAME,
    THIRD_STATION_STATION_POSITION,
    THIRD_STATION_PUBLISHING_TIME,
    CREATE_NEW_STATION_ALIAS,
} from "../constants"
import { 
    ADD_STATION_TEST_ID,
    ADD_STATION_KEY_TEST_ID,
    SUBMIT_ADD_STATION_KEY_TEST_ID,
    AUTHORIZATION_KEY,
    STATION_STATION_NAME_TEST_ID,
    STATION_STATION_POSITION_TEST_ID,
    STATION_PUBLISHING_TIME_TEST_ID,
    SUBMIT_CREATE_STATION_LABEL,
    CREATE_STATION_TEST_ID,
    SUBMIT_ADD_STATION_KEY_LABEL,
} from "const"
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
    setupAddStationByValidStationKey,
    setupAddStationByInvalidStationKey,
    setupFirstStation,
    setupCreateNewStation,
    setupFreeAPIStationLatestRecord,
} from "../utils"


describe("Admin page testing", () => {
    it("should contain the user information", () => {
        setupValidToken()
        setupAllStation()
        setupFreeAPIStationLatestRecord()
        visitRoute(ADMIN_ROUTE)

        cy.wait(SMALL_WAITING_TIME)
            .then(() => {
                checkTextExist(TEST_USERNAME)
                checkTextExist(TEST_PASSWORD_ADMIN_PAGE)
            })
    })

    it("should display all the station that the user have", () => {
        setupValidToken()
        setupFreeAPIStationLatestRecord()
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
        setupFirstStation()
        setupFreeAPIStationLatestRecord()

        visitRoute(ADMIN_ROUTE)
        getComponentByText(FIRST_STATION_STATION_NAME)
            .click()
        validateRoute(FIRST_STATION_PAGE_ROUTE)
    })

    it("should contain the add new station button and have the input tag to insert the station's key into it", () => {
        setupValidToken()
        setupAllStation()
        setupFreeAPIStationLatestRecord()

        setupAddStationByValidStationKey()

        visitRoute(ADMIN_ROUTE)
        checkComponentNotExistByTestId(ADD_STATION_KEY_TEST_ID)
        getComponentByTestId(ADD_STATION_TEST_ID)
            .click()
        checkComponentExistByTestId(ADD_STATION_KEY_TEST_ID)

        typeWithTestId(ADD_STATION_KEY_TEST_ID, THIRD_STATION_STATION_KEY) 

        getComponentByText(SUBMIT_ADD_STATION_KEY_LABEL)
            .click()

        cy.wait([`@${ADD_STATION_FETCH_ALIAS}`])
            .then(intercept => {
                expect(intercept.request.headers[AUTHORIZATION_KEY]).to.equal(getTheBearerToken(TESTING_TOKEN))
                expect(intercept.request.body.stationKey).to.equal(THIRD_STATION_STATION_KEY)
            })

        checkComponentNotExistByTestId(ADD_STATION_KEY_TEST_ID)
        checkComponentNotExistByTestId(SUBMIT_ADD_STATION_KEY_TEST_ID)
    })

    it("should display the error when the add station api call is wrong.", () => {
        setupValidToken()
        setupAllStation()
        setupAddStationByInvalidStationKey()
        setupFreeAPIStationLatestRecord()

        visitRoute(ADMIN_ROUTE)

        getComponentByTestId(ADD_STATION_TEST_ID)
            .click()
        typeWithTestId(ADD_STATION_KEY_TEST_ID, THIRD_STATION_STATION_KEY) 
        getComponentByText(SUBMIT_ADD_STATION_KEY_LABEL)
            .click()

        checkTextExist(STATION_KEY_DOES_NOT_EXIST_ERROR_MESSAGE)
    })

    it("should contain the create new staiton Button", () => {
        setupValidToken()
        setupAllStation()
        setupCreateNewStation()
        setupFreeAPIStationLatestRecord()

        visitRoute(ADMIN_ROUTE)

        checkComponentNotExistByTestId(STATION_STATION_NAME_TEST_ID)
        checkComponentNotExistByTestId(STATION_STATION_POSITION_TEST_ID)
        checkComponentNotExistByTestId(STATION_PUBLISHING_TIME_TEST_ID)

        getComponentByTestId(CREATE_STATION_TEST_ID)
            .click()

        typeWithTestId(STATION_STATION_NAME_TEST_ID, THIRD_STATION_STATION_NAME)
        typeWithTestId(STATION_STATION_POSITION_TEST_ID, THIRD_STATION_STATION_POSITION)
        typeWithTestId(STATION_PUBLISHING_TIME_TEST_ID, THIRD_STATION_PUBLISHING_TIME.toString())

        getComponentByText(SUBMIT_CREATE_STATION_LABEL)
            .click()

        cy.wait(`@${CREATE_NEW_STATION_ALIAS}`)
            .then(intercept => {
                expect(intercept.request.headers[AUTHORIZATION_KEY]).to.equal(getTheBearerToken(TESTING_TOKEN)) 
                expect(intercept.request.body.stationName).to.equal(THIRD_STATION_STATION_NAME) 
                expect(intercept.request.body.stationPosition).to.equal(THIRD_STATION_STATION_POSITION) 
                expect(intercept.request.body.pushingDataIntervalInSeconds).to.equal(THIRD_STATION_PUBLISHING_TIME) 
            })

        checkComponentNotExistByTestId(STATION_STATION_NAME_TEST_ID)
        checkComponentNotExistByTestId(STATION_STATION_POSITION_TEST_ID)
        checkComponentNotExistByTestId(STATION_PUBLISHING_TIME_TEST_ID)
    })
})
