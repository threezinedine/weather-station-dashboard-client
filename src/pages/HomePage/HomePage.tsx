import React, {
    useEffect,
    useState,
} from "react"
import {
    useDispatch,
    useSelector,
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
    combineClassName,
} from "utils"
import { 
    WeatherInformation,
} from "components"
import styles from "./HomePage.module.scss"
import { 
    StoreState,
} from "stores"
import { faCloud, faCloudRain, faCompass, faDroplet, faTemperature0, faWind } from "@fortawesome/free-solid-svg-icons"


const st = combineClassName(styles)


const HomePage: React.FC = () => {
    const dispatch = useDispatch()
    const [stations, setStations] = useState((): StationType[] => [])
    const [displayRecord, setDisplayRecord] = useState((): RecordType | null => null)
    const username = useSelector((state: StoreState) => state.UserReducer.username)

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
        <div className={st("wrapper")}>
            <div className={st("page-header")}>
                <div className={st("page-welcome")}>Welcom back <span>{username}</span></div>
                <select
                    className={st("home-page-select")}
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
                    <option disabled selected> -- Select a station -- </option>
                    {
                        stations.map((station: StationType) => (
                            <option
                                key={station.stationId}
                                className={st("option")}
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
                        <div className={st("data-content")}>
                            <WeatherInformation
                                label="Wind Direction"
                                value={displayRecord.windDirection}
                                icon={faCompass}
                            />
                            <WeatherInformation
                                label="Average Wind"
                                value={displayRecord.averageWindSpeedInOneMinute}
                                icon={faWind}
                                unit="m/s"
                            />
                            <WeatherInformation
                                label="Max Wind"
                                value={displayRecord.maxWindSpeedInFiveMinutes}
                                icon={faWind}
                                unit="m/s"
                            />
                            <WeatherInformation
                                label="Rain Fall (1 hour)"
                                value={displayRecord.rainFallInOneHour}
                                icon={faCloudRain}
                                unit="mm"
                            />
                            <WeatherInformation
                                label="Rain Fall (1 day)"
                                value={displayRecord.rainFallInOneDay}
                                icon={faCloudRain}
                                unit="mm"
                            />
                            <WeatherInformation
                                label="Temperature"
                                value={displayRecord.temperature}
                                icon={faTemperature0}
                                unit="°"
                            />
                            <WeatherInformation
                                label="Humidity"
                                value={displayRecord.humidity}
                                icon={faDroplet}
                                unit="%"
                            />
                            <WeatherInformation
                                label="Bar Pressure"
                                value={displayRecord.barPressure}
                                icon={faCloud}
                                unit="mPa"
                            />
                        </div>
                    )
                }
            </div>
        </div>
    )
}


export default HomePage
