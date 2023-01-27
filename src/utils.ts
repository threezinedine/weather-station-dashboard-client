import {
    FormFieldResponseProps,
} from "components/Form"
import { 
    GET_METHOD,
    PUT_METHOD,
    POST_METHOD,
    TOKEN_ITEM,
    AUTHORIZATION_KEY,
    ADD_STATION_API_ROUTE,
    LOGIN_API_ROUTE,
    TOKEN_VALIDATE_API_ROUTE,
    GET_ALL_STATIONS_API_ROUTE,
    ERROR_MESSAGE_TIME_OUT,
    RESET_STATOIN_KEY_API_ROUTE,
} from "const"
import api from "stores/api"
import { 
    addErrorAction,
    popErrorAction,
} from "stores/Error/actions"


export const validateToken = async (token: string | null) => {
    return api({
        method: GET_METHOD,
        url: TOKEN_VALIDATE_API_ROUTE,
        headers: generateAuthorizationHeader(token) 
    })
}

export const fetchAllStations = async (token: string | null) => {
    return api({
        method: GET_METHOD,
        url: GET_ALL_STATIONS_API_ROUTE,
        headers: generateAuthorizationHeader(token),
    })
}

export const addStationByStationId = async (token: string | null, stationKey: string) => {
    return api({
        method: PUT_METHOD,
        url: ADD_STATION_API_ROUTE,
        headers: generateAuthorizationHeader(token),
        data: {
            stationKey: stationKey,
        }
    }) 
}

export const resetStationKey = async (token: string | null, stationName: string) => {
    return api({
        method: PUT_METHOD,
        url: RESET_STATOIN_KEY_API_ROUTE,
        headers: generateAuthorizationHeader(token),
        data: {
            stationName: stationName,
        }
    })
}


export const fetchStationInformation = async (token: string | null, stationName: string) => {
    return api({
        method: GET_METHOD,
        url: `/stations/${stationName}`,
        headers: generateAuthorizationHeader(token),
    })
}

export const sendLoginFormData = async (data: FormData) => {
    return api({
        method: POST_METHOD,
        url: LOGIN_API_ROUTE,
        data: data,
        headers: { "Content-Type": "multipart/form-data" }
    })           
}

export const generateAuthorizationHeader = (token: string | null) => {
    return {
        [AUTHORIZATION_KEY]: generateBearerToken(token)
    }
}

export const generateBearerToken = (token: string | null): string => {
    return `Bearer ${token}`
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

export const getLoginFormFromFields = (fields: FormFieldResponseProps[]): FormData => {
    const data = new FormData()

    const username = fields.filter(field => field.name === "username")[0].value
    data.append("username", username)

    const password = fields.filter(field => field.name === "password")[0].value
    data.append("password", password)

    return data
}


export const handleErrorResponse = (err: any, dispatch: any) => {
    dispatch(addErrorAction(err.response.data.detail.msg))

    setTimeout(() => {
        dispatch(popErrorAction())
    }, ERROR_MESSAGE_TIME_OUT)
}
