import React, {
    useEffect,
} from "react"
import { 
    useNavigate,
} from "react-router-dom"

import AuthWrapperProps from "./AuthWrapperProps"
import { 
    TOKEN_ITEM,
    LOGIN_ROUTE,
} from "const"
import { 
    validateToken,
    loadToken,
} from "utils"


const AuthWrapper: React.FC<AuthWrapperProps> = ({
    children,
}) => {
    const navigate = useNavigate()

    useEffect(() => {
        const token: string | null = loadToken()
        if (token) {
            validateToken(token)
                .catch(() => {
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
