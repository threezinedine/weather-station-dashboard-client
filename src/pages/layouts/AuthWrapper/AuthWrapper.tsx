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
    TOKEN_ITEM,
    LOGIN_ROUTE,
} from "const"
import { 
    validateToken,
    loadToken,
} from "utils"
import { 
    addErrorAction,
    popErrorAction,
} from "stores/Error/actions"


const AuthWrapper: React.FC<AuthWrapperProps> = ({
    children,
}) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        const token: string | null = loadToken()
        if (token) {
            validateToken(token)
                .catch(() => {
                    dispatch(addErrorAction("Session expired"))
                    setTimeout(() => {
                        dispatch(popErrorAction())
                    }, 2000)
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
