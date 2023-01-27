import {
    GET_METHOD,
    VALIDATE_API_ROUTE,
    HTTP_200_OK,
    LOCAL_HOST,
    TOKEN_ITEM,
    TESTING_TOKEN
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

export const setupValidateToken = () => {
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
