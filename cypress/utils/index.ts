import {
    GET_METHOD,
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
    SECOND_STATION_STATION_KEY
} from '../constants'


export const getComponentByTestId = (testId: string) => {
    return cy.get(`[data-testid="${testId}"]`)
}


export const checkTextExist = (text: string) => {
    cy.contains(text)
}


export const checkTextNotExist = (text: string) => {
    cy.contains(text).should('not.exist')
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
    })
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
