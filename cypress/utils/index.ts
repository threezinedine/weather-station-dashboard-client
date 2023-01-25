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
