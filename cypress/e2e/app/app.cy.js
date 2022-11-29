describe('Приложение запущено', () => {
    it('Переход по local localhost:3000', () => {
        cy.visit('http://localhost:3000/')
    })
});