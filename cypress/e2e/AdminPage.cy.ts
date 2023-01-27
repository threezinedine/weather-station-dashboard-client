import {
    ADMIN_ROUTE, 
    FIRST_STATION_STATION_POSITION,
    FIRST_STATION_STATION_NAME, 
    SECOND_STATION_STATION_NAME, 
    SECOND_STATION_STATION_POSITION,
    FIRST_STATION_PAGE_ROUTE,
} from "../constants"
import {
    checkTextExist,
    getComponentByText,
    setupAllStation,
    setupValidToken,
    validateRoute,
    visitRoute,
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
})
