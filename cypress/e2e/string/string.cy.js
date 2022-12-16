import { 
    circle,
    defaultColor,
    changingColor,
    modifiedColor
} from "../constans";

import { SHORT_DELAY_IN_MS } from '../../../src/constants/delays'

describe('Тест страницы String', () => {
    beforeEach(() => {
        cy.visit('/recursion')
        cy.get('[data-testid="stringInputTest"]').as('input')
        cy.get('[data-testid="stringAddBtn"]').as('addBtn')
    });
    it('Кнока не доуступна при пустом инпуте', () => {
        cy.get('@input').should('be.empty')
        cy.get('@addBtn').should('be.disabled')
    });
    it('Строка и анимация разворачивается верно', () => {
        const initialString = '12345'
        const initialState = [
            changingColor,
            defaultColor,
            defaultColor,
            defaultColor,
            changingColor
        ]

        const firstStepString = '52341'
        const firstStepState = [
            modifiedColor,
            changingColor,
            defaultColor,
            changingColor,
            modifiedColor
        ]

        const secondStepString = '54321'
        const secondStepState = [
            modifiedColor,
            modifiedColor,
            modifiedColor,
            modifiedColor,
            modifiedColor
        ]

        cy.get('@input').type(initialString)
        cy.get('@addBtn').should('be.enabled').click()
        cy.get(circle).each(($el, index, $list) => {
            cy.get($list).should('have.length', 5)
            cy.get($el).contains(initialString[index])
            cy.get($el).should('have.css', 'border-color', initialState[index]);
        })

        cy.wait(SHORT_DELAY_IN_MS)

        cy.get(circle).each(($el, index, $list) => {
            cy.get($list).should('have.length', 5)
            cy.get($el).contains(firstStepString[index])
            cy.get($el).should('have.css', 'border-color', firstStepState[index]);
        })

        cy.wait(SHORT_DELAY_IN_MS)
        
        cy.get(circle).each(($el, index, $list) => {
            cy.get($list).should('have.length', 5)
            cy.get($el).contains(secondStepString[index])
            cy.get($el).should('have.css', 'border-color', secondStepState[index]);
        })
        cy.get('@addBtn').should('be.disabled')
    })
})

