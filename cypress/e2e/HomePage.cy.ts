import {
    STATION_SELECT_TAG_TEST_ID,
} from "const"
import {
    FIRST_RECORD_AVERAGE_WIND_SPEED,
    FIRST_RECORD_HUMIDITY,
    FIRST_RECORD_MAX_WIND_SPEED,
    FIRST_RECORD_PRESSUER,
    FIRST_RECORD_RAIN_FALL_ONE_DAY,
    FIRST_RECORD_RAIN_FALL_ONE_HOUR,
    FIRST_RECORD_TEMPERATURE,
    FIRST_RECORD_WIND_DIRECTION,
    FIRST_STATION_STATION_NAME,
    HOME_ROUTE,
} from "../constants"
import {
    checkTextExist,
    getComponentByTestId, 
    setupAllStation, 
    setupFirstStationLatestRecord, 
    setupValidToken,
    visitRoute,
} from "../utils"

describe("Home Page testing", () => {
    it("should contain select which user can show the list of station that the user can have", () => {
        setupValidToken()
        setupAllStation()
        setupFirstStationLatestRecord()

        visitRoute(HOME_ROUTE)

        getComponentByTestId(STATION_SELECT_TAG_TEST_ID)
            .select(FIRST_STATION_STATION_NAME)

        checkTextExist(FIRST_RECORD_WIND_DIRECTION.toString())
        checkTextExist(FIRST_RECORD_AVERAGE_WIND_SPEED.toString())
        checkTextExist(FIRST_RECORD_MAX_WIND_SPEED.toString())
        checkTextExist(FIRST_RECORD_RAIN_FALL_ONE_HOUR.toString())
        checkTextExist(FIRST_RECORD_RAIN_FALL_ONE_DAY.toString())
        checkTextExist(FIRST_RECORD_TEMPERATURE.toString())
        checkTextExist(FIRST_RECORD_HUMIDITY.toString())
        checkTextExist(FIRST_RECORD_PRESSUER.toString())
    })
})
