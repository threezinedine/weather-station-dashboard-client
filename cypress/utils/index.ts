import {
    TESTING_TOKEN,
    TEST_USERNAME,
    FIRST_STATION_STATION_NAME,
    FIRST_STATION_STATION_POSITION,
    FIRST_STATION_PUBLISHING_TIME,
    FIRST_STATION_STATION_ID,
    FIRST_STATION_STATION_KEY,
    SECOND_STATION_STATION_NAME,
    SECOND_STATION_STATION_POSITION,
    SECOND_STATION_PUBLISHING_TIME,
    SECOND_STATION_STATION_ID,
    SECOND_STATION_STATION_KEY,
    LOGIN_POST_ALIAS,
    ADD_STATION_FETCH_ALIAS,
    STATION_KEY_DOES_NOT_EXIST_ERROR_MESSAGE,
    THIRD_STATION_STATION_NAME,
    THIRD_STATION_STATION_POSITION,
    THIRD_STATION_PUBLISHING_TIME,
    THIRD_STATION_STATION_ID,
    THIRD_STATION_STATION_KEY,
    LOGIN_ERROR_MESSAGE,
    SESSION_EXPIRED_ERROR_MESSAGE,
    FIRST_STATION_API_ROUTE,
    RESET_PUT_ALIAS,
    CREATE_NEW_STATION_ALIAS,
} from '../constants'
import { 
    TOKEN_ITEM,
    GET_METHOD,
    PUT_METHOD,
    POST_METHOD,
    AUTHORIZATION_KEY,
    HTTP_401_UNAUTHORIZED,
    HTTP_200_OK,
    HTTP_404_NOT_FOUND,
    GET_ALL_STATIONS_API_ROUTE,
    TOKEN_VALIDATE_API_ROUTE,
    RESET_STATOIN_KEY_API_ROUTE,
    CREATE_NEW_STATION_API_ROUTE,
    ADD_STATION_API_ROUTE,
    LOGIN_API_ROUTE,
} from 'const'


export const getComponentByTestId = (testId: string) => {
    return cy.get(`[data-testid="${testId}"]`)
}

export const getComponentByText = (text: string) => {
    return cy.contains(text)
}


export const checkTextExist = (text: string) => {
    cy.contains(text)
}


export const checkTextNotExist = (text: string) => {
    cy.contains(text).should('not.exist')
}


export const checkComponentExistByTestId = (testId: string) => {
    getComponentByTestId(testId).should("exist")
}


export const checkComponentNotExistByTestId = (testId: string) => {
    getComponentByTestId(testId).should("not.exist")
}

export const typeWithTestId = (testid: string, text: string) => {
    getComponentByTestId(testid)
        .type(`{selectall}${text}`)
        .blur()
}


export const visitRoute = (route: string) => {
    cy.visit(route)
}


export const validateRoute = (route: string) => {
    cy.url().should("eq", route)
}

export const setupValidToken = () => {
    cy.intercept({
        method: GET_METHOD,
        url: TOKEN_VALIDATE_API_ROUTE,
    },
    {
        statusCode: HTTP_200_OK,
        body: {
            username: TEST_USERNAME,
        },
    })
    window.localStorage.setItem(TOKEN_ITEM, TESTING_TOKEN)
}

export const setupInvalidToken = () => {
    cy.intercept({
        method: GET_METHOD,
        url: TOKEN_VALIDATE_API_ROUTE,
    },
    {
        statusCode: HTTP_401_UNAUTHORIZED,
        body: {
            detail: {
                loc: [],
                msg: SESSION_EXPIRED_ERROR_MESSAGE,
            }
        }
    })
    window.localStorage.setItem(TOKEN_ITEM, TESTING_TOKEN)
}


export const setupValidUsernamePassword = () => {
    cy.intercept({
        method: POST_METHOD,
        url: LOGIN_API_ROUTE,
    },
    {
        statusCode: HTTP_200_OK,
        body: {
            user: {
                userId: 1,
                username: TEST_USERNAME,
            },
            token: TESTING_TOKEN,
        }
    }).as(LOGIN_POST_ALIAS)
}

export const setupInvalidUsernamePassword = () => {
    cy.intercept({
        method: POST_METHOD,
        url: LOGIN_API_ROUTE,
    },
    {
        statusCode: HTTP_404_NOT_FOUND,
        body: {
            detail: {
                loc: [],
                msg: LOGIN_ERROR_MESSAGE,
            }
        }
    })
}


export const setupAllStation = () => {
    cy.intercept({
        method: GET_METHOD,
        url: GET_ALL_STATIONS_API_ROUTE,
    },
    {
        statusCode: HTTP_200_OK,
        body: 
        [
            {
                stationName: FIRST_STATION_STATION_NAME,
                stationPosition: FIRST_STATION_STATION_POSITION,
                pushingDataIntervalInSeconds: FIRST_STATION_PUBLISHING_TIME,
                stationId: FIRST_STATION_STATION_ID,
                stationKey: FIRST_STATION_STATION_KEY,
            },
            {
                stationName: SECOND_STATION_STATION_NAME,
                stationPosition: SECOND_STATION_STATION_POSITION,
                pushingDataIntervalInSeconds: SECOND_STATION_PUBLISHING_TIME,
                stationId: SECOND_STATION_STATION_ID,
                stationKey: SECOND_STATION_STATION_KEY,
            }
        ]
    })
}


export const setupAddStationByInvalidStationKey = () => {
    cy.intercept({
        method: PUT_METHOD,
        url: ADD_STATION_API_ROUTE,
    },
    {
        statusCode: HTTP_404_NOT_FOUND,
        body: {
            detail: {
                loc: [],
                msg: STATION_KEY_DOES_NOT_EXIST_ERROR_MESSAGE,
            }
        }
    }).as(ADD_STATION_FETCH_ALIAS)
}


export const setupAddStationByValidStationKey = () => {
    cy.intercept({
        method: PUT_METHOD,
        url: ADD_STATION_API_ROUTE,
    },
    {
        statusCode: HTTP_200_OK,
        body: {
            stationName: THIRD_STATION_STATION_NAME,
            stationPosition: THIRD_STATION_STATION_POSITION,
            pushingDataIntervalInSeconds: THIRD_STATION_PUBLISHING_TIME,
            stationId: THIRD_STATION_STATION_ID,
            stationKey: THIRD_STATION_STATION_KEY,
}
    }).as(ADD_STATION_FETCH_ALIAS)
}


export const setupFirstStation = () => {
    cy.intercept({
        method: GET_METHOD,
        url: FIRST_STATION_API_ROUTE,
    }, {
        status: HTTP_200_OK,
        body: {
            stationName: FIRST_STATION_STATION_NAME,
            stationPosition: FIRST_STATION_STATION_POSITION,
            pushingDataIntervalInSeconds: FIRST_STATION_PUBLISHING_TIME,
            stationId: FIRST_STATION_STATION_ID,
            stationKey: FIRST_STATION_STATION_KEY,
        }
    })
}

export const setupCreateNewStation = () => {
    cy.intercept({
        method: POST_METHOD,
        url: CREATE_NEW_STATION_API_ROUTE,
    }, {
        status: HTTP_200_OK,
        body: {
            stationName: THIRD_STATION_STATION_NAME,
            stationPosition: THIRD_STATION_STATION_POSITION,
            pushingDataIntervalInSeconds: THIRD_STATION_PUBLISHING_TIME,
            stationId: THIRD_STATION_STATION_ID,
            stationKey: THIRD_STATION_STATION_KEY,
        }
    }).as(CREATE_NEW_STATION_ALIAS)
}


export const setupResetStationKey = () => {
    cy.intercept({
        method: PUT_METHOD,
        url: RESET_STATOIN_KEY_API_ROUTE,
    }).as(RESET_PUT_ALIAS)
}


export const createAuthorizationHeader = (token: string) => {
    return {
        [AUTHORIZATION_KEY]: getTheBearerToken(token)
    }
}


export const getTheBearerToken = (token: string): string => {
    return `Bearer ${token}`
}


