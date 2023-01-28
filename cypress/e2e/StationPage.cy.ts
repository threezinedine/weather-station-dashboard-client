import {
    FIRST_STATION_PAGE_ROUTE, 
    FIRST_STATION_PUBLISHING_TIME, 
    FIRST_STATION_STATION_KEY, 
    FIRST_STATION_STATION_NAME,
    FIRST_STATION_STATION_POSITION,
    RESET_PUT_ALIAS,
    TESTING_TOKEN,
    LARGE_WATING_TIME,
    FIRST_RECORD_CREATED_TIME,
    SECOND_RECORD_CREATED_TIME,
    FIRST_RECORD_WIND_DIRECTION,
    FIRST_RECORD_AVERAGE_WIND_SPEED,
    FIRST_RECORD_MAX_WIND_SPEED,
    FIRST_RECORD_RAIN_FALL_ONE_HOUR,
    FIRST_RECORD_RAIN_FALL_ONE_DAY,
    FIRST_RECORD_TEMPERATURE,
    FIRST_RECORD_HUMIDITY,
    FIRST_RECORD_PRESSUER,
} from "../constants"
import { 
    RESET_KEY_TEST_ID,
    AUTHORIZATION_KEY,
} from "const"
import {
    checkTextExist,
    checkTextNotExist,
    getComponentByTestId,
    getComponentByText,
    getTheBearerToken,
    setupAllRecords,
    setupFirstStation,
    setupResetStationKey,
    setupValidToken, 
    visitRoute,
} from "../utils"

describe("Station Page test", () => {
    it("should display all the information of the station", () => {
        setupValidToken()
        setupFirstStation()
        setupAllRecords()

        visitRoute(FIRST_STATION_PAGE_ROUTE)

        checkTextExist(FIRST_STATION_STATION_NAME)
        checkTextExist(FIRST_STATION_STATION_POSITION)
        checkTextExist(FIRST_STATION_STATION_KEY)
        checkTextExist(FIRST_STATION_PUBLISHING_TIME.toString())
    })

    it("should have the button to reset the station key", () => {
        setupValidToken()
        setupFirstStation()
        setupResetStationKey()
        setupAllRecords()

        visitRoute(FIRST_STATION_PAGE_ROUTE)
        
        cy.wait(LARGE_WATING_TIME)
            .then(() => {
                getComponentByTestId(RESET_KEY_TEST_ID)
                    .click()
            })

        cy.wait(`@${RESET_PUT_ALIAS}`)
            .then(intercept => {
                expect(intercept.request.headers[AUTHORIZATION_KEY]).to.equal(getTheBearerToken(TESTING_TOKEN))
                expect(intercept.request.body.stationName).to.equal(FIRST_STATION_STATION_NAME)
            })
    })

    it("should display the list of station's records (maximum 30 latest records)", () => {
        setupValidToken()
        setupFirstStation()
        setupAllRecords()

        visitRoute(FIRST_STATION_PAGE_ROUTE)

        checkTextExist(FIRST_RECORD_CREATED_TIME)
        checkTextExist(SECOND_RECORD_CREATED_TIME)
    })

    it("should show all records information when click into the station's record time", () => {
        setupValidToken()
        setupFirstStation()
        setupAllRecords()

        visitRoute(FIRST_STATION_PAGE_ROUTE)

        getComponentByText(FIRST_RECORD_CREATED_TIME)
            .click()

        checkTextExist(FIRST_RECORD_WIND_DIRECTION.toString())
        checkTextExist(FIRST_RECORD_AVERAGE_WIND_SPEED.toString())
        checkTextExist(FIRST_RECORD_MAX_WIND_SPEED.toString())
        checkTextExist(FIRST_RECORD_RAIN_FALL_ONE_HOUR.toString())
        checkTextExist(FIRST_RECORD_RAIN_FALL_ONE_DAY.toString())
        checkTextExist(FIRST_RECORD_TEMPERATURE.toString())
        checkTextExist(FIRST_RECORD_HUMIDITY.toString())
        checkTextExist(FIRST_RECORD_PRESSUER.toString())

        getComponentByText(FIRST_RECORD_CREATED_TIME)
            .click()
    })
})
