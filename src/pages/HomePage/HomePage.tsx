import React, {
    useEffect,
} from "react"
import { 
    useNavigate,
} from "react-router-dom"

import { 
    TOKEN_ITEM,
    LOGIN_ROUTE,
    LOGOUT_BUTTON_TEST_ID,
} from "const"
import { 
    validateToken,
} from "utils"


const HomePage: React.FC = () => {
    const navigate = useNavigate()

    useEffect(() => {
        const token: string | null = localStorage.getItem(TOKEN_ITEM)

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
            <div>
                <button
                    data-testid={LOGOUT_BUTTON_TEST_ID}
                    onClick={() => {
                        localStorage.removeItem(TOKEN_ITEM)
                        navigate(LOGIN_ROUTE)
                    }}
                >
                    Logout
                </button>
            </div>
            Home Page
        </div>
    )
}


export default HomePage
