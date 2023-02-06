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
    SECOND_RECORD_WIND_DIRECTION,
    SECOND_RECORD_AVERAGE_WIND_SPEED,
    SECOND_RECORD_MAX_WIND_SPEED,
    SECOND_RECORD_RAIN_FALL_ONE_HOUR,
    SECOND_RECORD_RAIN_FALL_ONE_DAY,
    SECOND_RECORD_TEMPERATURE,
    SECOND_RECORD_HUMIDITY,
    SECOND_RECORD_PRESSUER,
    SMALL_WAITING_TIME,
    CHANGE_PUSHING_DATA_ALIAS,
    FIRST_STATION_NEW_PUSHING_DATA_INTERVAL,
} from "../constants"
import { 
    RESET_KEY_TEST_ID,
    AUTHORIZATION_KEY,
    RESET_STATION_KEY_SUCCESSFULLY_MESSAGE,
    STATION_STATION_KEY_COPY_TEST_ID,
    COPY_SUCCESSFULLY_MESSAGE,
    CHANGE_PUSHING_DATA_INTERVAL_TEST_ID,
    NEW_PUSHING_DATA_INTERVAL_INPUT_TEST_ID,
    PUSHING_DATA_INTERVAL_SUBMIT_LABEL,
} from "const"
import {
    checkComponentExistByTestId,
    checkTextExist,
    getComponentByTestId,
    getComponentByText,
    getTheBearerToken,
    setupAllRecords,
    setupChangeThePushingDataInterval,
    setupFirstStation,
    setupFreeAPIStationLatestRecord,
    setupResetStationKey,
    setupValidToken, 
    visitRoute,
} from "../utils"

describe("Station Page test", () => {
    it("should display all the information of the station", () => {
        setupValidToken()
        setupFirstStation()
        setupFreeAPIStationLatestRecord()
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
        setupFreeAPIStationLatestRecord()

        visitRoute(FIRST_STATION_PAGE_ROUTE)
        
        cy.wait(LARGE_WATING_TIME)
            .then(() => {
                getComponentByTestId(RESET_KEY_TEST_ID)
                    .click()
                checkTextExist(RESET_STATION_KEY_SUCCESSFULLY_MESSAGE)
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
        setupFreeAPIStationLatestRecord()

        visitRoute(FIRST_STATION_PAGE_ROUTE)

        checkTextExist(FIRST_RECORD_CREATED_TIME)
        checkTextExist(SECOND_RECORD_CREATED_TIME)
    })

    it("should show all records information when click into the station's record time", () => {
        setupValidToken()
        setupFirstStation()
        setupAllRecords()
        setupFreeAPIStationLatestRecord()

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

    it("should show all record's information of the clicked records and close others", () => {
        setupValidToken()
        setupFirstStation()
        setupFreeAPIStationLatestRecord()
        setupAllRecords()

        visitRoute(FIRST_STATION_PAGE_ROUTE)

        getComponentByText(FIRST_RECORD_CREATED_TIME)
            .click()

        getComponentByText(SECOND_RECORD_CREATED_TIME)
            .click()

        checkTextExist(SECOND_RECORD_WIND_DIRECTION.toString())
        checkTextExist(SECOND_RECORD_AVERAGE_WIND_SPEED.toString())
        checkTextExist(SECOND_RECORD_MAX_WIND_SPEED.toString())
        checkTextExist(SECOND_RECORD_RAIN_FALL_ONE_HOUR.toString())
        checkTextExist(SECOND_RECORD_RAIN_FALL_ONE_DAY.toString())
        checkTextExist(SECOND_RECORD_TEMPERATURE.toString())
        checkTextExist(SECOND_RECORD_HUMIDITY.toString())
        checkTextExist(SECOND_RECORD_PRESSUER.toString())
    })

    it("should have the station's key copy button", () => {
        setupValidToken()
        setupFirstStation()
        setupFreeAPIStationLatestRecord()
        setupAllRecords()

        visitRoute(FIRST_STATION_PAGE_ROUTE)

        cy.wait(SMALL_WAITING_TIME)
            .then(() => {
                getComponentByTestId(STATION_STATION_KEY_COPY_TEST_ID)
            })

    })

    it("should have the change station pushing data interval button", () => {
        setupValidToken()
        setupFirstStation()
        setupFreeAPIStationLatestRecord()
        setupAllRecords()
        setupChangeThePushingDataInterval()

        visitRoute(FIRST_STATION_PAGE_ROUTE)

        getComponentByTestId(CHANGE_PUSHING_DATA_INTERVAL_TEST_ID)
            .click()

        getComponentByTestId(NEW_PUSHING_DATA_INTERVAL_INPUT_TEST_ID)
            .type(FIRST_STATION_NEW_PUSHING_DATA_INTERVAL.toString())

        getComponentByText(PUSHING_DATA_INTERVAL_SUBMIT_LABEL)
            .click()

        cy.wait(`@${CHANGE_PUSHING_DATA_ALIAS}`)
            .then(intercept => {
                expect(intercept.request.headers[AUTHORIZATION_KEY]).to.equal(getTheBearerToken(TESTING_TOKEN))
                expect(intercept.request.body.stationName).to.equal(FIRST_STATION_STATION_NAME)
                expect(intercept.request.body.pushingDataIntervalInSeconds).to.equal(FIRST_STATION_NEW_PUSHING_DATA_INTERVAL)
            })
    })
})
