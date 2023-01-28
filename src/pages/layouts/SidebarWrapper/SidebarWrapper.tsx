import React, {
    useEffect,
    useState,
} from "react"
import {
    useDispatch,
} from "react-redux"

import SidebarWrapperProps from "./SidebarWrapperProps"
import {
    FREE_API_STATION_STATION_NAME,
    RecordType,
} from "const"
import {
    fetchTheLatestRecord, 
    handleErrorResponse, 
    loadToken,
} from "utils"


const SidebarWrapper: React.FC<SidebarWrapperProps> = ({
    children,
}) => {
    const dispatch = useDispatch()
    const [displayRecord, setDisplayRecord] = useState((): RecordType | null => null)

    useEffect(() => {
        const token = loadToken()

        fetchTheLatestRecord(token, FREE_API_STATION_STATION_NAME)
            .then(response => {
                setDisplayRecord(response.data)
            })
            .catch(err => {
                handleErrorResponse(err, dispatch)
            })
    }, [])

    return (
        <div>
            Sidebar
            <div>
                { children }
            </div>
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
    )
}


export default SidebarWrapper
