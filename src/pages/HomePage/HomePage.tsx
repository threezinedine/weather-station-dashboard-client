import React, {
    useEffect,
    useState,
} from "react"
import {
    useDispatch,
} from "react-redux"

import {
    RecordType,
    StationType, 
    STATION_SELECT_TAG_TEST_ID,
} from "const"
import {
    fetchAllStations,
    fetchTheLatestRecord,
    handleErrorResponse,
    loadToken,
} from "utils"


const HomePage: React.FC = () => {
    const dispatch = useDispatch()
    const [stations, setStations] = useState((): StationType[] => [])
    const [displayRecord, setDisplayRecord] = useState((): RecordType | null => null)

    useEffect(() => {
        const token = loadToken()

        fetchAllStations(token)
            .then(response => {
                setStations(response.data)
            })
            .catch(err => {
                handleErrorResponse(err, dispatch)
            })
    }, [])


    return (
        <div>
            Home Page
            <div>
                <select
                    data-testid={STATION_SELECT_TAG_TEST_ID}
                    onChange={(evt) => {
                        const token = loadToken()

                        fetchTheLatestRecord(token, evt.target.value)
                            .then(response => {
                                setDisplayRecord(response.data)
                            })
                            .catch(err => {
                                handleErrorResponse(err, dispatch)
                                setDisplayRecord(null)
                            })

                    }}
                >
                    <option disabled selected> -- select an option -- </option>
                    {
                        stations.map((station: StationType) => (
                            <option
                                key={station.stationId}
                                value={station.stationName}
                            >
                                { station.stationName }
                            </option>
                        )) 
                    }
                </select>
            </div>
            <div>
                {
                    displayRecord && (
                        <div>
                            <div>Wind Direction: { displayRecord.windDirection }</div>
                            <div>Average Wind Speed: { displayRecord.averageWindSpeedInOneMinute }</div>
                            <div>Max Wind Speed: { displayRecord.maxWindSpeedInFiveMinutes }</div>
                            <div>Rain Fall In One Hour: { displayRecord.rainFallInOneHour }</div>
                            <div>Rain Fall In One Day: { displayRecord.rainFallInOneDay }</div>
                            <div>Temperature: { displayRecord.temperature }</div>
                            <div>Humidity: { displayRecord.humidity }</div>
                            <div>Bar Pressure: { displayRecord.barPressure }</div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}


export default HomePage
