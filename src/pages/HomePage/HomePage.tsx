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
import { 
    WeatherInformation,
} from "components"


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

        const id = setTimeout(() => {
            fetchAllStations(token)
                .then(response => {
                    setStations(response.data)
                })
                .catch(err => {
                    handleErrorResponse(err, dispatch)
                })
        }, 30000)

        return () => {
            clearInterval(id)
        }
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
                            <WeatherInformation
                                label="Wind Direction"
                                value={displayRecord.windDirection}
                            />
                            <WeatherInformation
                                label="Average Wind Speed"
                                value={displayRecord.averageWindSpeedInOneMinute}
                            />
                            <WeatherInformation
                                label="Max Wind Speed"
                                value={displayRecord.maxWindSpeedInFiveMinutes}
                            />
                            <WeatherInformation
                                label="Rain Fall In One Hour"
                                value={displayRecord.rainFallInOneHour}
                            />
                            <WeatherInformation
                                label="Rain Fall In One Day"
                                value={displayRecord.rainFallInOneDay}
                            />
                            <WeatherInformation
                                label="Temperature"
                                value={displayRecord.temperature}
                            />
                            <WeatherInformation
                                label="Humidity"
                                value={displayRecord.humidity}
                            />
                            <WeatherInformation
                                label="Bar Pressure"
                                value={displayRecord.barPressure}
                            />
                        </div>
                    )
                }
            </div>
        </div>
    )
}


export default HomePage
