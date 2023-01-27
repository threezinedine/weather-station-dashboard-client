import React, {
    useEffect,
} from "react"
import { 
    useNavigate,
} from "react-router-dom"
import { 
    useDispatch,
} from "react-redux"

import AuthWrapperProps from "./AuthWrapperProps"
import { 
    LOGIN_ROUTE,
} from "const"
import { 
    validateToken,
    loadToken,
    handleErrorResponse,
} from "utils"
import {saveUsernameAction} from "stores/User/actions"


const AuthWrapper: React.FC<AuthWrapperProps> = ({
    children,
}) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        const token: string | null = loadToken()
        if (token) {
            validateToken(token)
                .then(response => {
                    dispatch(saveUsernameAction(response.data.username))
                })
                .catch(err => {
                    handleErrorResponse(err, dispatch)
                    navigate(LOGIN_ROUTE)
                })
        } else {
            navigate(LOGIN_ROUTE)
        }
    }, [])

    return (
        <div>
            { children }
        </div>
    )
}


export default AuthWrapper
