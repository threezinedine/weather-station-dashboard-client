import React, {
    useEffect,
    useState,
} from "react"
import { 
    useNavigate,
} from "react-router-dom"

import {
    StationType,
    INPUT_TAG_TEXT_TYPE,
    ADD_STATION_KEY_TEST_ID,
    SUBMIT_ADD_STATION_KEY_TEST_ID,
    ADD_STATION_TEST_ID,
} from "const"
import {
    addStationByStationId,
    fetchAllStations,
    loadToken,
} from "utils"


const AdminPage: React.FC = () => {
    const navigate = useNavigate()
    const [stations, setStations] = useState([])
    const [addStation, setAddStation] = useState(false)
    const [stationKey, setStationKey] = useState("")

    useEffect(() => {
        const token = loadToken()

        fetchAllStations(token)
            .then(response => {
                setStations(response.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    return (
        <div>
            Admin Page
            <div>
                {
                    stations.map((station: StationType, index: number) => (
                        <div
                            key={index}
                        >
                            <button
                                onClick={() => {
                                    navigate(`/station/${station.stationId}`)
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
                                            console.log(err)
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
            </div>
        </div>
    )
}


export default AdminPage
