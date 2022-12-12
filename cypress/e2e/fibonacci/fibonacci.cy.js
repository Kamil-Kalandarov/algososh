describe('Тест страницы Fibonacci', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/fibonacci')
    });
    it('Кнока не доуступна при пустом инпуте', () => {
        cy.get('input').should('be.empty')
        cy.get('[data-testid="fibonacciTestBtn"]').should('be.disabled')
    });
    it('Последовательность Фиббоначи и анимация разворачивается верно', () => {
        cy.get('[data-testid="fibonacciInputTest"]').type(4)
        cy.get('[data-testid="fibonacciTestBtn"]').should('be.enabled').click()
        cy.get('[data-testid="circleTest"]').should('have.length', 2).eq(0).contains(1)
        cy.get('[data-testid="circleTest"]').should('have.length', 2).eq(1).contains(1)
        cy.wait(500)
        cy.get('[data-testid="circleTest"]').should('have.length', 3).eq(2).contains(2)
        cy.wait(500)
        cy.get('[data-testid="circleTest"]').should('have.length', 4).eq(3).contains(3)
        cy.wait(500)
        cy.get('[data-testid="circleTest"]').should('have.length', 5).eq(4).contains(5)
    });
});