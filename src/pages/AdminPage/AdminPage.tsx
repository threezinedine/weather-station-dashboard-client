import React, {
    useEffect,
    useState,
} from "react"
import { 
    useNavigate,
} from "react-router-dom"

import api from "stores/api"
import {
    GET_ALL_STATIONS_API_ROUTE,
    GET_METHOD,
    AUTHORIZATION_KEY,
    StationType,
} from "const"
import {
    loadToken,
} from "utils"


const AdminPage: React.FC = () => {
    const navigate = useNavigate()
    const [stations, setStations] = useState([])
    const [addStation, setAddStation] = useState(false)

    useEffect(() => {
        const token = loadToken()
        api({
            method: GET_METHOD,
            url: GET_ALL_STATIONS_API_ROUTE,
            headers: {
                [AUTHORIZATION_KEY]: `Bearer ${token}`
            }
        })
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
                                data-testid="addStationKey"
                                type="text" />
                            <button
                                data-testid="submitAddStationKey"
                            >
                                Submit
                            </button>
                        </div>
                    )
                }
                <button
                    data-testid="addStation"
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
