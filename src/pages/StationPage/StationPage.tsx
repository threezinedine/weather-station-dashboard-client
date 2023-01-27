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
    GET_METHOD,
    PUT_METHOD,
    StationType,
} from "const"
import api from "stores/api"
import {
    generateAuthorizationHeader,
    handleErrorResponse,
    loadToken,
} from "utils"


const StationPage: React.FC = () => {
    const dispatch = useDispatch()
    const [stationInformation, setStationInformation] = useState((): StationType => ({
        stationId: 0,
        stationName: "",
        stationPosition: "",
        pushingDataIntervalInSeconds: 0,
        stationKey: "",
    }))
    const { stationName } = useParams()

    useEffect(() => {
        const token = loadToken()
            
        api({
            method: GET_METHOD,
            url: `/stations/${stationName}`,
            headers: generateAuthorizationHeader(token),
        })
            .then(response => {
                setStationInformation(response.data)
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
                        data-testid="resetKey"
                        onClick={() => {
                            const token = loadToken()

                            api({
                                method: PUT_METHOD,
                                url: "/stations/reset",
                                headers: generateAuthorizationHeader(token),
                                data: {
                                    stationName: stationInformation.stationName
                                }
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
            </div>
        </div>
    )
}


export default StationPage
