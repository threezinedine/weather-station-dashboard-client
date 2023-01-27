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
    RESET_KEY_TEST_ID,
    StationType,
    ZERO_NUMBER,
} from "const"
import {
    fetchStationInformation,
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
    const { stationName } = useParams()

    useEffect(() => {
        const token = loadToken()
        fetchStationInformation(token, stationName || EMPTY_STRING)            
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
                        data-testid={RESET_KEY_TEST_ID}
                        onClick={() => {
                            const token = loadToken()
                            
                            resetStationKey(token, stationInformation.stationName)
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
