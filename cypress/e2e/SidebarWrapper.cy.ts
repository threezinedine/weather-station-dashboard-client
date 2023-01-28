import { 
    DEFAULT_RECORD_AVERAGE_WIND_SPEED,
    DEFAULT_RECORD_HUMIDITY,
    DEFAULT_RECORD_MAX_WIND_SPEED,
    DEFAULT_RECORD_PRESSUER,
    DEFAULT_RECORD_RAIN_FALL_ONE_DAY,
    DEFAULT_RECORD_RAIN_FALL_ONE_HOUR,
    DEFAULT_RECORD_TEMPERATURE,
    DEFAULT_RECORD_WIND_DIRECTION,
    HOME_ROUTE,
} from "../constants"
import { 
    checkTextExist, 
    setupValidToken,
    visitRoute,
    setupFreeAPIStationLatestRecord,
    setupAllStation,
} from "../utils"


describe("Sidebar Wrapper testing", () => {
    it("should contain all current information of the free api", () => {
        setupValidToken()
        setupAllStation()
        setupFreeAPIStationLatestRecord()

        visitRoute(HOME_ROUTE)

        checkTextExist(DEFAULT_RECORD_WIND_DIRECTION.toString())
        checkTextExist(DEFAULT_RECORD_AVERAGE_WIND_SPEED.toString())
        checkTextExist(DEFAULT_RECORD_MAX_WIND_SPEED.toString())
        checkTextExist(DEFAULT_RECORD_RAIN_FALL_ONE_HOUR.toString())
        checkTextExist(DEFAULT_RECORD_RAIN_FALL_ONE_DAY.toString())
        checkTextExist(DEFAULT_RECORD_TEMPERATURE.toString())
        checkTextExist(DEFAULT_RECORD_HUMIDITY.toString())
        checkTextExist(DEFAULT_RECORD_PRESSUER.toString())
    })
})
