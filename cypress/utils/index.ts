export const getComponentByTestId = (testId: string) => {
    return cy.get(`[data-testid="${testId}"]`)
}
