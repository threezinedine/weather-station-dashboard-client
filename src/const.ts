export const EMPTY_STRING = ""
export const ZERO_NUMBER = 0

export const FORM_SUBMIT_BUTTON_TEST_ID = "submitBtn"
export const AVATAR_TEST_ID = "avatar"
export const LOGOUT_BUTTON_TEST_ID = "logoutBtn"
export const BRAND_DATA_TEST_ID = "brand"
export const USER_DATA_TEST_ID = "user"
export const SUBMIT_ADD_STATION_KEY_TEST_ID = "submitAddStationKey"
export const ADD_STATION_KEY_TEST_ID = "addStationKey"
export const ADD_STATION_TEST_ID = "addStation"
export const RESET_KEY_TEST_ID = "resetKey"

export const LOGIN_ROUTE = "/login"
export const HOME_ROUTE = "/"
export const ADMIN_ROUTE = "/admin"
export const REGISTER_ROUTE = "/register"
export const STATION_PAGE_ROUTE = "/station/:stationName"

export const TOKEN_ITEM = "token_item"

export const GET_METHOD = "GET"
export const POST_METHOD = "POST"
export const PUT_METHOD = "PUT"
export const DELETE_METHOD = "DELETE"

export const AUTHORIZATION_KEY = "Authorization"

export const TOKEN_VALIDATE_API_ROUTE = "users/validate"
export const LOGIN_API_ROUTE = "/users/login"
export const GET_ALL_STATIONS_API_ROUTE = "/stations"
export const ADD_STATION_API_ROUTE = "/stations"
export const RESET_STATOIN_KEY_API_ROUTE = "/stations/reset" 

export const HTTP_200_OK = 200

export const INPUT_TAG_TEXT_TYPE = "text"
export const INPUT_TAG_PASSWORD_TYPE = "password"

export const ERROR_MESSAGE_TIME_OUT = 2000

export const LOGIN_SUBMIT_LABEL = "Login"

export const LOGIN_ERROR_MESSAGE = "Login error"


export interface StationType {
    stationId: number
    stationName: string 
    stationPosition: string 
    stationKey: string
    pushingDataIntervalInSeconds: number
}
