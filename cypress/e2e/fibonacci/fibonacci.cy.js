import { circle } from "../constans";
import { SHORT_DELAY_IN_MS } from '../../../src/constants/delays'

describe('Тест страницы Fibonacci', () => {
    beforeEach(() => {
        cy.visit('/fibonacci')
        cy.get('[data-testid="fibonacciTestBtn"]').as('addBtn')
    });
    it('Кнока не доуступна при пустом инпуте', () => {
        cy.get('input').should('be.empty')
        cy.get('@addBtn').should('be.disabled')
    });
    it('Последовательность Фиббоначи и анимация разворачивается верно', () => {
        cy.clock()
        cy.get('[data-testid="fibonacciInputTest"]').type(4)
        cy.get('[data-testid="fibonacciTestBtn"]').should('be.enabled').click()
        cy.get(circle).should('have.length', 2).eq(0).contains(1)
        cy.get(circle).should('have.length', 2).eq(1).contains(1)
        cy.tick(SHORT_DELAY_IN_MS)
        cy.get(circle).should('have.length', 3).eq(2).contains(2)
        cy.tick(SHORT_DELAY_IN_MS)
        cy.get(circle).should('have.length', 4).eq(3).contains(3)
        cy.tick(SHORT_DELAY_IN_MS)
        cy.get(circle).should('have.length', 5).eq(4).contains(5)
        cy.get('[data-testid="fibonacciTestBtn"]').should('be.disabled')
    });
});