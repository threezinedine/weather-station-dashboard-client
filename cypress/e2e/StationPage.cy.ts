import {
    FIRST_STATION_PAGE_ROUTE, 
    FIRST_STATION_STATION_ID,
    FIRST_STATION_PUBLISHING_TIME, 
    FIRST_STATION_STATION_KEY, 
    FIRST_STATION_STATION_NAME,
    FIRST_STATION_STATION_POSITION,
    GET_METHOD,
    HTTP_200_OK,
    FIRST_STATION_API_ROUTE,
} from "../constants"
import {
    checkTextExist,
    setupValidToken, 
    visitRoute,
} from "../utils"

describe("Station Page test", () => {
    it("should display all the information of the station", () => {
        setupValidToken()

        cy.intercept({
            method: GET_METHOD,
            url: FIRST_STATION_API_ROUTE,
        }, {
            status: HTTP_200_OK,
            body: {
                stationName: FIRST_STATION_STATION_NAME,
                stationPosition: FIRST_STATION_STATION_POSITION,
                pushingDataIntervalInSeconds: FIRST_STATION_PUBLISHING_TIME,
                stationId: FIRST_STATION_STATION_ID,
                stationKey: FIRST_STATION_STATION_KEY,
            }
        })

        visitRoute(FIRST_STATION_PAGE_ROUTE)

        checkTextExist(FIRST_STATION_STATION_NAME)
        checkTextExist(FIRST_STATION_STATION_POSITION)
        checkTextExist(FIRST_STATION_STATION_KEY)
        checkTextExist(FIRST_STATION_PUBLISHING_TIME.toString())
    })
})
