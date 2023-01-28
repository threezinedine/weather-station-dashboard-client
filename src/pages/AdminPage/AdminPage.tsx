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
} from "const"
import {
    addStationByStationId,
    extractStationDataFromFields,
    fetchAllStations,
    handleErrorResponse,
    loadToken,
    postNewStationData,
} from "utils"
import {
    StoreState,
} from "stores"
import { 
    Form,
} from "components"


const AdminPage: React.FC = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch() 
    const username = useSelector((state: StoreState): string => state.UserReducer.username)

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
        <div>
            Admin Page
            <div>
                <div>
                    Username: { username }
                </div>
                <div>
                    Password: ************** 
                </div>
            </div>
            <div>
                {
                    stations.map((station: StationType, index: number) => (
                        <div
                            key={index}
                        >
                            <button
                                onClick={() => {
                                    navigate(`/station/${station.stationName}`)
                                }}
                            >
                                { station.stationName } 
                            </button>
                            <div>
                                { station.stationPosition }
                            </div>
                        </div>
                    ))
                }
            </div>
            <div>
                {
                    addStation && (
                        <div>
                            <input 
                                data-testid={ADD_STATION_KEY_TEST_ID}
                                value={stationKey}
                                onChange={(evt) => {
                                    setStationKey(evt.target.value)
                                }}
                                type={INPUT_TAG_TEXT_TYPE} />
                            <button
                                data-testid={SUBMIT_ADD_STATION_KEY_TEST_ID}
                                onClick={() => {
                                    const token = loadToken()
                                    addStationByStationId(token, stationKey)
                                        .catch(err => {
                                            handleErrorResponse(err, dispatch)
                                        })
                                    setAddStation(!addStation)
                                }}
                            >
                                Submit
                            </button>
                        </div>
                    )
                }
                <button
                    data-testid={ADD_STATION_TEST_ID}
                    onClick={() => {
                        setAddStation(!addStation)
                    }}
                >
                    Add station
                </button>
                <button
                    data-testid={CREATE_STATION_TEST_ID}
                    onClick={() => {
                        setupCreateNewStation(!createNewStation)
                    }}
                >
                    Create Station
                </button>
                {
                    createNewStation && (
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
                    )
                }
            </div>
        </div>
    )
}


export default AdminPage
