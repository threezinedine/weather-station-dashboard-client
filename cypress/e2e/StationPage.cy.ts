import {
    FIRST_STATION_PAGE_ROUTE, 
    FIRST_STATION_PUBLISHING_TIME, 
    FIRST_STATION_STATION_KEY, 
    FIRST_STATION_STATION_NAME,
    FIRST_STATION_STATION_POSITION,
    RESET_KEY_TEST_ID,
    RESET_PUT_ALIAS,
    AUTHORIZATION_KEY,
    TESTING_TOKEN,
    LARGE_WATING_TIME,
} from "../constants"
import {
    checkTextExist,
    getComponentByTestId,
    getTheBearerToken,
    setupFirstStation,
    setupResetStationKey,
    setupValidToken, 
    visitRoute,
} from "../utils"

describe("Station Page test", () => {
    it("should display all the information of the station", () => {
        setupValidToken()
        setupFirstStation()

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

        visitRoute(FIRST_STATION_PAGE_ROUTE)
        
        cy.wait(LARGE_WATING_TIME)
            .then(() => {
                getComponentByTestId(RESET_KEY_TEST_ID)
                    .click()
            })

        cy.wait(`@${RESET_PUT_ALIAS}`)
            .then(intercept => {
                expect(intercept.request.headers[AUTHORIZATION_KEY]).to.equal(getTheBearerToken(TESTING_TOKEN))
                console.log(intercept)
                expect(intercept.request.body.stationName).to.equal(FIRST_STATION_STATION_NAME)
            })
    })
})
