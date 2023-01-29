import React, {
    useEffect,
    useState,
} from "react"
import { 
    useNavigate,
} from "react-router-dom"
import {
    useSelector,
    useDispatch,
} from "react-redux"
import {
    FontAwesomeIcon,
} from "@fortawesome/react-fontawesome"
import {
    faCirclePlus,
    faPlus,
} from "@fortawesome/free-solid-svg-icons"

import {
    StationType,
    INPUT_TAG_TEXT_TYPE,
    ADD_STATION_KEY_TEST_ID,
    SUBMIT_ADD_STATION_KEY_TEST_ID,
    ADD_STATION_TEST_ID,
    CREATE_STATION_TEST_ID,
    STATION_STATION_NAME_TEST_ID,
    CREATE_STATION_STATION_NAME_LABEL,
    SUBMIT_CREATE_STATION_LABEL,
    STATION_STATION_POSITION_TEST_ID,
    CREATE_STATION_STATION_POSITION_LABEL,
    STATION_PUBLISHING_TIME_TEST_ID,
    CREATE_STATION_PUBLISHING_TIME_LABEL,
    ADD_STATION_LABEL,
    SUBMIT_ADD_STATION_KEY_LABEL,
    CREATE_STATION_LABEL,
} from "const"
import {
    addStationByStationId,
    extractStationDataFromFields,
    extractValueFromFields,
    fetchAllStations,
    handleErrorResponse,
    loadToken,
    postNewStationData,
} from "utils"
import {
    StoreState,
} from "stores"
import { 
    Form, Modal,
} from "components"
import styles from "./AdminPage.module.scss"
import { 
    combineClassName,
} from "utils"
import FacebookUserImage from "assets/images/facebook-user.jpg"
import { 
    Button,
} from "components"


const AdminPage: React.FC = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch() 
    const username = useSelector((state: StoreState): string => state.UserReducer.username)
    const st = combineClassName(styles)

    const [stations, setStations] = useState([])
    const [addStation, setAddStation] = useState(false)
    const [stationKey, setStationKey] = useState("")
    const [createNewStation, setupCreateNewStation] = useState(false)

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
        <div
            className={st("wrapper")}
        >
            <div>
                <img 
                    className={st("avatar-image")}
                    src={FacebookUserImage}
                />
                <div className={st("user-information-container")}>
                    <div className={st("user-information-container__title")}>
                        User Information
                    </div>
                    <div className={st("user-information")}>
                        <div className={st("user-information__label")}>
                            Username:
                        </div>
                        <div className={st("user-information__value")}>
                            { username }
                        </div>
                    </div>
                    <div className={st("user-information")}>
                        <div className={st("user-information__label")}>
                            Password: 
                        </div>
                        <div className={st("user-information__value")}>
                            **************
                        </div>
                    </div>
                </div>
            </div>
            <div className={st("station-column")}>
                <div className={st("station-information")}>
                    <div className={st("station-title")}>
                        <div className={st("station-title__name")}>
                            Station&apos;s name
                        </div>
                        <div className={st("station-title__position")}>
                            Station&apos;s Position
                        </div>
                    </div>
                    {
                        stations.map((station: StationType, index: number) => (
                            <Button
                                noColor
                                haveHover
                                leftTextAlign
                                key={index}
                                onClick={() => {
                                    navigate(`/station/${station.stationName}`)
                                }}
                                wrapperStyle={st("station")}
                            >
                                <div className={st("station__name")}>
                                    { station.stationName } 
                                </div>
                                <div className={st("station__position")}>
                                    { station.stationPosition }
                                </div>
                            </Button>
                        ))
                    }
                </div>
                <div className={st("option-buttons-group")}>
                    <Button
                        data-testid={ADD_STATION_TEST_ID}
                        onClick={() => {
                            setAddStation(!addStation)
                        }}
                        wrapperStyle={st("option-buttons-group__btn")}
                    >
                        <FontAwesomeIcon icon={faPlus} />
                        <div className={st("option-buttons-group-btn__label")}>
                            Add station
                        </div>
                    </Button>
                    <Button
                        data-testid={CREATE_STATION_TEST_ID}
                        onClick={() => {
                            setupCreateNewStation(!createNewStation)
                        }}
                        wrapperStyle={st("option-buttons-group__btn")}
                    >
                        <FontAwesomeIcon icon={faCirclePlus} />
                        <div className={st("option-buttons-group-btn__label")}>
                            Create station
                        </div>
                    </Button>
                </div>
            </div>
            <div>
                <Modal
                    visible={addStation}
                    title={ADD_STATION_LABEL}
                    onClose={() => {
                        setAddStation(false)
                    }}
                >
                    <div className={st("station-modal-content-container")}>
                        <Form 
                            fields={[
                                {
                                    name: ADD_STATION_KEY_TEST_ID,
                                    label: "Station's key",
                                    errors: [],
                                },
                            ]}
                            onSubmit={(fields) => {
                                const token = loadToken()
                                const stationKey = extractValueFromFields(fields, ADD_STATION_KEY_TEST_ID)

                                addStationByStationId(token, stationKey)
                                    .then(() => {
                                        return fetchAllStations(token)
                                    })
                                    .then(response => {
                                        setStations(response.data)
                                    })
                                    .catch(err => {
                                        handleErrorResponse(err, dispatch)
                                    })
                                setAddStation(!addStation)
                            }}
                            submitLabel={SUBMIT_ADD_STATION_KEY_LABEL}
                            onSubmitError={() => {
                                console.log("Here")
                            }}
                        />
                    </div>
                </Modal>
                <Modal
                    visible={createNewStation}
                    title={CREATE_STATION_LABEL}
                    onClose={() => {
                        setupCreateNewStation(false)
                    }}
                >
                    <Form 
                        fields={[
                            {
                                name: STATION_STATION_NAME_TEST_ID,
                                label: CREATE_STATION_STATION_NAME_LABEL,
                                errors: []
                            },
                            {
                                name: STATION_STATION_POSITION_TEST_ID,
                                label: CREATE_STATION_STATION_POSITION_LABEL,
                                errors: []
                            },
                            {
                                name: STATION_PUBLISHING_TIME_TEST_ID,
                                label: CREATE_STATION_PUBLISHING_TIME_LABEL,
                                errors: []
                            },
                        ]}
                        submitLabel={SUBMIT_CREATE_STATION_LABEL}
                        onSubmit={(fields) => {
                            const token = loadToken()

                            postNewStationData(extractStationDataFromFields(fields), token)
                                .then(() => {
                                    setupCreateNewStation(!createNewStation)
                                })
                                .then(() => {
                                    return fetchAllStations(token)
                                })
                                .then(response => {
                                    setStations(response.data)
                                })
                                .catch(err => {
                                    handleErrorResponse(err, dispatch)
                                }) 
                        }}
                        onSubmitError={() => {
                            console.log("Here")
                        }}
                    />
                </Modal>
            </div>
        </div>
    )
}


export default AdminPage
