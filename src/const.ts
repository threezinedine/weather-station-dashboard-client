export const EMPTY_STRING = ""
export const FORM_SUBMIT_BUTTON_TEST_ID = "submitBtn"
export const LOGOUT_BUTTON_TEST_ID = "logoutBtn"
export const BRAND_DATA_TEST_ID = "brand"
export const USER_DATA_TEST_ID = "user"

export const LOGIN_ROUTE = "/login"
export const HOME_ROUTE = "/"
export const ADMIN_ROUTE = "/admin"
export const REGISTER_ROUTE = "/register"

export const TOKEN_ITEM = "token_item"

export const GET_METHOD = "GET"
export const POST_METHOD = "POST"

export const AUTHORIZATION_KEY = "Authorization"

export const TOKEN_VALIDATE_API_ROUTE = "users/validate"
export const LOGIN_API_ROUTE = "/users/login"
export const GET_ALL_STATIONS_API_ROUTE = "/stations"

export const HTTP_200_OK = 200

export const ERROR_MESSAGE_TIME_OUT = 2000


export interface StationType {
    stationId: number
    stationName: string 
    stationPosition: string 
    stationKey: string
    pushingDataIntervalInSeconds: number
}
