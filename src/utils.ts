import { 
    GET_METHOD,
    TOKEN_ITEM,
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


export const loadToken = (): string | null => {
    return localStorage.getItem(TOKEN_ITEM)
}

export const clearToken = (): void => {
    localStorage.removeItem(TOKEN_ITEM)
}

export const saveToken = (token: string): void => {
    localStorage.setItem(TOKEN_ITEM, token)
}
