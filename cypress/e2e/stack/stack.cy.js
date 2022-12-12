describe('Тест страницы Stack', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/stack')
    });
    it('Кнопка недоступна при пустом инпуте', () => {
        cy.get('input').should('be.empty')
        cy.get('[data-testid="stackTestAddBtn"]').should('be.disabled')
        cy.get('[data-testid="stackTestDeleteBtn"]').should('be.disabled')
        cy.get('[data-testid="stackTestClearBtn"]').should('be.disabled')
    });

    it('Добавление элемента в стек и анимация работает правильно', () => {
        const input = cy.get('[data-testid="stackInputTest"]')
        cy.clock()
        input.type('13')
        cy.get('[data-testid="stackTestAddBtn"]').should('be.enabled').click()
        cy.get('[data-testid="circleTest"]')
        .should('have.length', 1)
        .eq(0)
        .should('have.css', 'border-color', 'rgb(210, 82, 225)')
        .contains('13')
        cy.get('[data-testid="headTest"]').contains('top')
        cy.get('[data-testid="indexTest"]').eq(0).contains('0')
        cy.tick(500)
        cy.get('[data-testid="circleTest"]')
        .should('have.css', 'border-color', 'rgb(0, 50, 255)')
        .eq(0).contains('13')
        cy.get('[data-testid="stackTestAddBtn"]').should('be.disabled')
        cy.get('[data-testid="stackTestDeleteBtn"]').should('be.enabled')
        cy.get('[data-testid="stackTestClearBtn"]').should('be.enabled')

        input.type('123')
        cy.get('[data-testid="stackTestAddBtn"]').should('be.enabled').click()
        cy.get('[data-testid="headTest"]').eq(0).should('be.empty')
        cy.get('[data-testid="circleTest"]')
        .should('have.length', 2)
        .should('have.css', 'border-color', 'rgb(0, 50, 255)')
        .eq(1).contains('123')
        cy.get('[data-testid="headTest"]').contains('top')
        cy.get('[data-testid="indexTest"]').eq(1).contains('1')
        cy.tick(500)
        cy.get('[data-testid="circleTest"]')
        .should('have.css', 'border-color', 'rgb(0, 50, 255)')
        .eq(1).contains('123')
        cy.get('[data-testid="stackTestAddBtn"]').should('be.disabled')
        cy.get('[data-testid="stackTestDeleteBtn"]').should('be.enabled')
        cy.get('[data-testid="stackTestClearBtn"]').should('be.enabled')
    });

    /* it('Удаление элемента из стека и анимация работает верно', () => {
        cy.get('[data-testid="stackTestAddBtn"]').should('be.disabled')
        cy.get('[data-testid="stackTestDeleteBtn"]').should('be.enabled')
        cy.get('[data-testid="stackTestClearBtn"]').should('be.enabled')
        cy.clock()
        cy.get('[data-testid="stackTestDeleteBtn"]').click()
        cy.get('[data-testid="circleTest"]')
        .should('have.length', 2)
        .eq(1)
        .should('have.css', 'border-color', 'rgb(210, 82, 225)')
        .contains('123')
        cy.get('[data-testid="headTest"]').contains('top')
        cy.get('[data-testid="indexTest"]').eq(1).contains('1')
    }) */
})