import {
    GET_METHOD,
    PUT_METHOD,
    VALIDATE_API_ROUTE,
    HTTP_200_OK,
    LOCAL_HOST,
    TOKEN_ITEM,
    TESTING_TOKEN,
    HTTP_401_UNAUTHORIZED,
    LOGIN_API_ROUTE,
    POST_METHOD,
    TEST_USERNAME,
    HTTP_404_NOT_FOUND,
    GET_ALL_STATIONS_API_ROUTE,
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
    AUTHORIZATION_KEY,
    LOGIN_POST_ALIAS,
    ADD_STATION_BY_STATION_KEY_API_ROUTE,
    ADD_STATION_FETCH_ALIAS,
    STATION_KEY_DOES_NOT_EXIST_ERROR_MESSAGE,
    THIRD_STATION_STATION_NAME,
    THIRD_STATION_STATION_POSITION,
    THIRD_STATION_PUBLISHING_TIME,
    THIRD_STATION_STATION_ID,
    THIRD_STATION_STATION_KEY,
} from '../constants'


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
        url: VALIDATE_API_ROUTE,
        hostname: LOCAL_HOST,
    },
    {
        statusCode: HTTP_200_OK,
    })
    window.localStorage.setItem(TOKEN_ITEM, TESTING_TOKEN)
}

export const setupInvalidToken = () => {
    cy.intercept({
        method: GET_METHOD,
        url: VALIDATE_API_ROUTE,
        hostname: LOCAL_HOST,
    },
    {
        statusCode: HTTP_401_UNAUTHORIZED,
    })
    window.localStorage.setItem(TOKEN_ITEM, TESTING_TOKEN)
}


export const setupValidUsernamePassword = () => {
    cy.intercept({
        method: POST_METHOD,
        url: LOGIN_API_ROUTE,
        hostname: LOCAL_HOST,
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
        hostname: LOCAL_HOST,
    },
    {
        statusCode: HTTP_404_NOT_FOUND,
    })
}


export const setupAllStation = () => {
    cy.intercept({
        method: GET_METHOD,
        url: GET_ALL_STATIONS_API_ROUTE,
        hostname: LOCAL_HOST,
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
        url: ADD_STATION_BY_STATION_KEY_API_ROUTE,
        hostname: LOCAL_HOST,
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
        url: ADD_STATION_BY_STATION_KEY_API_ROUTE,
        hostname: LOCAL_HOST,
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


export const createAuthorizationHeader = (token: string) => {
    return {
        [AUTHORIZATION_KEY]: getTheBearerToken(token)
    }
}


export const getTheBearerToken = (token: string): string => {
    return `Bearer ${token}`
}


