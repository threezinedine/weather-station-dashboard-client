import React, {
    useEffect,
    useState,
} from "react"

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
    const [stations, setStations] = useState([])
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
                            <div>
                                { station.stationName } 
                            </div>
                            <div>
                                { station.stationPosition }
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}


export default AdminPage
