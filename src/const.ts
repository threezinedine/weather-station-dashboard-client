export const EMPTY_STRING = ""
export const ZERO_NUMBER = 0

export const USERNAME_DATA_TEST_ID = "username"
export const PASSWORD_DATA_TEST_ID = "password"
export const VALID_PASSWORD_DATA_TEST_ID = "valid"
export const FORM_SUBMIT_BUTTON_TEST_ID = "submitBtn"
export const AVATAR_TEST_ID = "avatar"
export const LOGOUT_BUTTON_TEST_ID = "logoutBtn"
export const BRAND_DATA_TEST_ID = "brand"
export const USER_DATA_TEST_ID = "user"
export const SUBMIT_ADD_STATION_KEY_TEST_ID = "submitAddStationKey"
export const ADD_STATION_KEY_TEST_ID = "addStationKey"
export const ADD_STATION_TEST_ID = "addStation"
export const RESET_KEY_TEST_ID = "resetKey"
export const CREATE_STATION_TEST_ID = "createStation"
export const STATION_STATION_NAME_TEST_ID = "stationStationName"
export const STATION_STATION_KEY_COPY_TEST_ID = "stationKeyCopy"
export const STATION_STATION_POSITION_TEST_ID = "stationStationPosition"
export const STATION_PUBLISHING_TIME_TEST_ID = "stationPublishingTime"
export const STATION_SELECT_TAG_TEST_ID = "stationSelect"
export const MODAL_CANCEL_BUTTON_TEST_ID = "formCancel"
export const MODAL_SUBMIT_BUTTON_TEST_ID = "formSubmit"
export const MODAL_WRAPPER_TEST_ID = "modalWrapper"

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

export const AUTHORIZATION_KEY = "authorization"

export const TOKEN_VALIDATE_API_ROUTE = "users/validate"
export const LOGIN_API_ROUTE = "/users/login"
export const GET_ALL_STATIONS_API_ROUTE = "/stations"
export const ADD_STATION_API_ROUTE = "/stations"
export const RESET_STATOIN_KEY_API_ROUTE = "/stations/reset" 
export const CREATE_NEW_STATION_API_ROUTE = "/stations"

export const FREE_API_STATION_STATION_NAME = "default"

export const HTTP_200_OK = 200
export const HTTP_401_UNAUTHORIZED = 401
export const HTTP_404_NOT_FOUND = 404

export const INPUT_TAG_TEXT_TYPE = "text"
export const INPUT_TAG_PASSWORD_TYPE = "password"

export const ERROR_MESSAGE_TIME_OUT = 2000

export const SUBMIT_CREATE_STATION_LABEL = "Submit"
export const USER_BUTTON_LABEL = "Admin"
export const LOGOUT_BUTTON_LABEL = "Logout"
export const LOGIN_SUBMIT_LABEL = "Login"
export const REGISTER_SUBMIT_LABEL = "Register"
export const CREATE_STATION_STATION_NAME_LABEL = "Station name"
export const CREATE_STATION_STATION_POSITION_LABEL = "Station name"
export const CREATE_STATION_PUBLISHING_TIME_LABEL = "Pushing time in seconds"
export const ADD_STATION_LABEL = "Add Station"
export const CREATE_STATION_LABEL = "Create Station"
export const SUBMIT_ADD_STATION_KEY_LABEL = "Submit Station Key"

export const LOGIN_ERROR_MESSAGE = "Login error"
export const LOGIN_SUCCESSFULLY_MESSAGE = "Login successfully"
export const RESET_STATION_KEY_SUCCESSFULLY_MESSAGE = "Reset successfully"
export const COPY_SUCCESSFULLY_MESSAGE = "Copy successfully"
export const ADD_STATION_SUCCESSFULLY_MESSAGE = "Add station successfully"


export const TOAST_ERROR_CLASS = "error"
export const TOAST_NOTI_CLASS = "noti"


export interface NewStationProps {
    stationName: string 
    stationPosition: string 
    pushingDataIntervalInSeconds: number
}


export interface StationType extends NewStationProps {
    stationId: number
    stationKey: string
}

export interface RecordType {
    stationId: number,
    windDirection: number,
    averageWindSpeedInOneMinute: number,
    maxWindSpeedInFiveMinutes: number,
    rainFallInOneHour: number,
    rainFallInOneDay: number,
    temperature: number,
    humidity: number,
    barPressure: number,
    createdTime: string,
}
