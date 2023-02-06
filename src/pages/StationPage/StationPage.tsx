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
    CHANGE_PUSHING_DATA_INTERVAL_TEST_ID,
    COPY_SUCCESSFULLY_MESSAGE,
    EMPTY_STRING,
    NEW_PUSHING_DATA_INTERVAL_INPUT_TEST_ID,
    PUSHING_DATA_INTERVAL_SUBMIT_LABEL,
    RecordType,
    RESET_KEY_TEST_ID,
    RESET_STATION_KEY_SUCCESSFULLY_MESSAGE,
    StationType,
    STATION_STATION_KEY_COPY_TEST_ID,
    ZERO_NUMBER,
} from "const"
import {
    changeThePushingDataIntervale,
    displayTheNotification,
    extractValueFromFields,
    fetchStationInformation,
    fetchStationRecords,
    handleErrorResponse,
    loadToken,
    resetStationKey,
} from "utils"
import { 
    InformationBlock,
    Button,
    Modal,
    Form,
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
    const { stationName = EMPTY_STRING } = useParams()
    const [pushingDataIntervalInSeconds, setPushingDataIntervalInSeconds] = useState(ZERO_NUMBER)
    const [showPushingDataIntervalModal, setShowPushingDataIntervalModal] = useState(false)

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
                                    setPushingDataIntervalInSeconds(response.data.pushingDataIntervalInSeconds)
                                    displayTheNotification(RESET_STATION_KEY_SUCCESSFULLY_MESSAGE, dispatch)
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
                        data-testid={STATION_STATION_KEY_COPY_TEST_ID}
                        onClick={() => {
                            navigator.clipboard.writeText(stationInformation.stationKey)
                                .then(() => {
                                    displayTheNotification(COPY_SUCCESSFULLY_MESSAGE, dispatch)
                                })
                                .catch(err => {
                                    handleErrorResponse(err, dispatch)
                                })
                        }}
                        wrapperStyle={st("btn-groups__btn")}
                    >
                        <FontAwesomeIcon icon={faCopy} />
                        <div className={st("btn-groups__btn__label")}>
                            Copy station&apos;s key
                        </div>
                    </Button>
                    <Button
                        data-testid={CHANGE_PUSHING_DATA_INTERVAL_TEST_ID}
                        onClick={() => {
                            setShowPushingDataIntervalModal(true)
                        }}
                        wrapperStyle={st("btn-groups__btn")}
                    >
                        <div className={st("btn-groups__btn__label")}>
                            Change pushing data interval
                        </div>
                    </Button>
                </div>
            </div>
            <Modal
                visible={showPushingDataIntervalModal}
                title="New value"
                onClose={() => {
                    console.log("Here")
                    setShowPushingDataIntervalModal(false)
                }}
            >
                <div className={st("station-modal-content-container")}>
                    <Form 
                        fields={[
                            {
                                name: NEW_PUSHING_DATA_INTERVAL_INPUT_TEST_ID,
                                label: "Pushing data interval",
                                errors: [],
                            },
                        ]}
                        onSubmit={(fields) => {
                            const token = loadToken()
                            const newPushingDataInterval = extractValueFromFields(fields, 
                                NEW_PUSHING_DATA_INTERVAL_INPUT_TEST_ID)

                            changeThePushingDataIntervale(token, 
                                stationInformation.stationName,
                                parseInt(newPushingDataInterval))
                                .then(() => {
                                    setShowPushingDataIntervalModal(false)
                                })
                                .catch(err => {
                                    handleErrorResponse(err, dispatch)
                                })
                        }}
                        submitLabel={PUSHING_DATA_INTERVAL_SUBMIT_LABEL}
                        onSubmitError={() => {
                            console.log("Here")
                        }}
                    />
                </div>
            </Modal>
            <div className={st("record-column")}>
                <div className={st("record-column__title")}>
                    Record
                </div>
                <div>
                    {
                        records.map((record: RecordType, index: number) => (
                            <Button
                                key={index}
                                leftTextAlign
                                noColor
                                haveHover
                                toggleMenu={false}
                                toggleItem={(
                                    <InformationBlock 
                                        title="Record Information"
                                        fields={[
                                            {
                                                label: "Wind Direction",
                                                value: record.windDirection,
                                            },
                                            {
                                                label: "Average Wind Speed",
                                                value: record.averageWindSpeedInOneMinute,
                                            },
                                            {
                                                label: "Max Wind Speed",
                                                value: record.maxWindSpeedInFiveMinutes,
                                            },
                                            {
                                                label: "Rain Fall One Day",
                                                value: record.rainFallInOneDay,
                                            },
                                            {
                                                label: "Rain Fall One Hour",
                                                value: record.rainFallInOneHour,
                                            },
                                            {
                                                label: "Temperature",
                                                value: record.temperature,
                                            },
                                            {
                                                label: "Humidity",
                                                value: record.humidity,
                                            },
                                            {
                                                label: "Pressure",
                                                value: record.barPressure,
                                            },
                                        ]}

                                    />
                                )}
                                wrapperStyle={st("record-column__record")}
                            >
                                <div>
                                    { record.createdTime }
                                </div>
                            </Button> 
                        ))
                    }
                </div>
            </div>
        </div>
    )
}


export default StationPage
