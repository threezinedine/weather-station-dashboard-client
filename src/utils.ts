import { 
    GET_METHOD,
    AUTHORIZATION_KEY,
    TOKEN_VALIDATE_API_ROUTE,
} from "const"
import api from "stores/api"


export const validateToken = async (token: string) => {
    return api({
        method: GET_METHOD,
        url: TOKEN_VALIDATE_API_ROUTE,
        headers: {
            [AUTHORIZATION_KEY]: `Bearer ${token}`
        }
    })
}
