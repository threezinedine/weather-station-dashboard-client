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
    FontAwesomeIcon,
} from "@fortawesome/react-fontawesome"
import {
    faArrowsRotate, 
    faCopy,
} from "@fortawesome/free-solid-svg-icons"

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
import { 
    InformationBlock,
    Button,
} from "components"
import { 
    combineClassName,
} from "utils"
import styles from "./StationPage.module.scss"


const StationPage: React.FC = () => {
    const dispatch = useDispatch()
    const st = combineClassName(styles)
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
        <div className={st("wrapper")}>
            <div className={st("station-column")}>
                <InformationBlock 
                    fields={[
                        {
                            label: "Station name",
                            value: stationInformation.stationName,
                        },
                        {
                            label: "Station position",
                            value: stationInformation.stationPosition,
                        },
                        {
                            label: "Station key",
                            value: stationInformation.stationKey,
                        },
                        {
                            label: "Pushing data interval",
                            value: stationInformation.pushingDataIntervalInSeconds,
                        },
                    ]}
                    title="Station Information"
                />
                <div className={st("btn-groups")}>
                    <Button
                        data-testid={RESET_KEY_TEST_ID}
                        onClick={() => {
                            const token = loadToken()
                            
                            resetStationKey(token, stationInformation.stationName)
                                .then(() => {
                                    return fetchStationInformation(token, stationName || EMPTY_STRING)
                                })
                                .then(response => {
                                    setStationInformation(response.data)
                                })
                                .catch(err => {
                                    handleErrorResponse(err, dispatch)
                                })
                        }}
                        wrapperStyle={st("btn-groups__btn")}
                    >
                        <FontAwesomeIcon icon={faArrowsRotate} />
                        <div className={st("btn-groups__btn__label")}>
                            Reset
                        </div>
                    </Button>
                    <Button
                        onClick={() => {
                            navigator.clipboard.writeText(stationInformation.stationKey)
                        }}
                        wrapperStyle={st("btn-groups__btn")}
                    >
                        <FontAwesomeIcon icon={faCopy} />
                        <div className={st("btn-groups__btn__label")}>
                            Copy station&apos;s key
                        </div>
                    </Button>
                </div>
            </div>
            <div className={st("record-column")}>
                <div>
                    {
                        records.map((record: RecordType, index: number) => (
                            <Button
                                key={index}
                                leftTextAlign
                                noColor
                                haveHover
                                onClick={() => {
                                    if (displayRecord === null || displayRecord.createdTime !== record.createdTime) {
                                        setDisplayRecord(record)
                                    } else {
                                        setDisplayRecord(null)
                                    }
                                }}
                                wrapperStyle={st("record-column__record")}
                            >
                                <div>
                                    { record.createdTime }
                                </div>
                            </Button> 
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
    )
}


export default StationPage
