import React, {
    useEffect,
    useState,
} from "react"
import {
    useParams,
} from "react-router-dom"
import {
    useDispatch,
} from "react-redux"

import {
    EMPTY_STRING,
    RecordType,
    RESET_KEY_TEST_ID,
    StationType,
    ZERO_NUMBER,
} from "const"
import {
    fetchStationInformation,
    fetchStationRecords,
    handleErrorResponse,
    loadToken,
    resetStationKey,
} from "utils"


const StationPage: React.FC = () => {
    const dispatch = useDispatch()
    const [stationInformation, setStationInformation] = useState((): StationType => ({
        stationId: ZERO_NUMBER,
        stationName: EMPTY_STRING,
        stationPosition: EMPTY_STRING,
        pushingDataIntervalInSeconds: ZERO_NUMBER,
        stationKey: EMPTY_STRING,
    }))
    const [records, setRecords] = useState((): RecordType[] => [])
    const [displayRecord, setDisplayRecord] = useState((): RecordType | null => null)
    const { stationName = EMPTY_STRING } = useParams()

    useEffect(() => {
        const token = loadToken()

        fetchStationInformation(token, stationName)            
            .then(response => {
                setStationInformation(response.data)
            })
            .then(() => {
                return fetchStationRecords(token, stationName)
            })
            .then(response => {
                setRecords(response.data)
            })
            .catch(err => {
                handleErrorResponse(err, dispatch)
            })
    }, [])

    return (
        <div>
            Station Page
            <div>
                <div>Station Name: { stationInformation.stationName }</div>
                <div>Station Position: { stationInformation.stationPosition }</div>
                <div>
                    Station Key: { stationInformation.stationKey }
                    <button
                        data-testid={RESET_KEY_TEST_ID}
                        onClick={() => {
                            const token = loadToken()
                            
                            resetStationKey(token, stationInformation.stationName)
                                .then(() => {
                                    return fetchStationInformation(token, stationName || EMPTY_STRING)
                                })
                                .then(response => {
                                    console.log(response)
                                    setStationInformation(response.data)
                                })
                                .catch(err => {
                                    handleErrorResponse(err, dispatch)
                                })
                        }}
                    >
                        Reset
                    </button>
                </div>
                <div>Publishing Time (in seconds): { stationInformation.pushingDataIntervalInSeconds }</div>
                <div>
                    Records: 
                    <div>
                        {
                            records.map((record: RecordType, index: number) => (
                                <button
                                    key={index}
                                    onClick={() => {
                                        if (displayRecord === null || displayRecord.createdTime !== record.createdTime) {
                                            setDisplayRecord(record)
                                        } else {
                                            setDisplayRecord(null)
                                        }
                                    }}
                                >
                                    { record.createdTime }
                                </button> 
                            ))
                        }
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
            </div>
        </div>
    )
}


export default StationPage
