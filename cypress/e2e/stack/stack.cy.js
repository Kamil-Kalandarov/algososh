import { 
    circle,
    head,
    index,
    defaultColor,
    changingColor
} from "../constans";

import { SHORT_DELAY_IN_MS } from '../../../src/constants/delays'

describe('Тест страницы Stack', () => {
    beforeEach(() => {
        cy.visit('/stack')
        cy.get('[data-testid="stackInputTest"]').as('input')
        cy.get('[data-testid="stackTestAddBtn"]').as('addBtn')
        cy.get('[data-testid="stackTestDeleteBtn"]').as('deleteBtn')
        cy.get('[data-testid="stackTestClearBtn"]').as('clearBtn')
    });
    it('Кнопка недоступна при пустом инпуте', () => {
        cy.get('@input').should('be.empty')
        cy.get('@addBtn').should('be.disabled')
        cy.get('@deleteBtn').should('be.disabled')
        cy.get('@clearBtn').should('be.disabled')
    });

    it('Добавление элемента в стек и анимация работает верно', () => {
        cy.clock()
        cy.get('@input').type('13')
        cy.get('@addBtn').should('be.enabled').click()
        cy.get(circle)
        .should('have.length', 1)
        .eq(0)
        .should('have.css', 'border-color', changingColor)
        .contains('13')
        cy.get(head).contains('top')
        cy.get(index).eq(0).contains('0')
        cy.tick(SHORT_DELAY_IN_MS)
        cy.get(circle)
        .should('have.css', 'border-color', defaultColor)
        .eq(0).contains('13')
        cy.get('@addBtn').should('be.disabled')
        cy.get('@deleteBtn').should('be.enabled')
        cy.get('@clearBtn').should('be.enabled')

        cy.get('@input').type('123')
        cy.get('@addBtn').should('be.enabled').click()
        cy.get(head).eq(0).should('be.empty')
        cy.get(circle)
        .should('have.length', 2).eq(0).should('have.css', 'border-color', defaultColor)
        cy.get(circle)
        .eq(1).should('have.css', 'border-color', changingColor).contains('123')
        cy.get(head).eq(1).contains('top')
        cy.get(head).eq(0).should('be.empty')
        cy.get(index).eq(1).contains('1')
        cy.tick(SHORT_DELAY_IN_MS)
        cy.get(circle)
        .eq(1).should('have.css', 'border-color', defaultColor).contains('123')
        cy.get('@addBtn').should('be.disabled')
        cy.get('@deleteBtn').should('be.enabled')
        cy.get('@clearBtn').should('be.enabled')
    });

    it('Удаление элемента из стека и анимация работает верно', () => {
        cy.get('@input').type('13')
        cy.get('@addBtn').should('be.enabled').click()
        cy.get('@input').type('123')
        cy.get('@addBtn').should('be.enabled').click()
        cy.get('@addBtn').should('be.disabled')
        cy.get('@deleteBtn').should('be.enabled')
        cy.get('@clearBtn').should('be.enabled')
        cy.clock()
        cy.get(circle).as('circle')
        .should('have.length', 2).eq(1).should('have.css', 'border-color', defaultColor)
        cy.get('@deleteBtn').click()
        cy.get(circle)
        .should('have.length', 2)
        .eq(1).should('have.css', 'border-color', changingColor).contains('123')
        cy.get(head).eq(1).contains('top')
        cy.get(index).eq(1).contains('1')
        cy.tick(SHORT_DELAY_IN_MS)
        cy.get(circle).should('have.length', 1)
        cy.get('@addBtn').should('be.disabled')
        cy.get('@deleteBtn').should('be.enabled')
        cy.get('@clearBtn').should('be.enabled')

        cy.get('@deleteBtn').click()
        cy.get(circle)
        .eq(0).should('have.css', 'border-color', changingColor).contains('13')
        cy.get(head).eq(0).contains('top')
        cy.get(index).contains('0')
        cy.tick(SHORT_DELAY_IN_MS)
        cy.get('@addBtn').should('be.disabled')
        cy.get('@deleteBtn').should('be.disabled')
        cy.get('@clearBtn').should('be.disabled')
        cy.get(circle).should('have.length', 0)
    });
    it('Очистка стека работает верно', () => {
        cy.get('@input').type('13')
        cy.get('@addBtn').should('be.enabled').click()
        cy.get('@input').type('13').type('123')
        cy.get('@addBtn').should('be.enabled').click()
        cy.clock()
        cy.get(circle)
        .should('have.length', 2).eq(1).should('have.css', 'border-color', defaultColor)
        cy.get('@clearBtn').click()
        cy.get(circle).should('have.length', 0)
    });
});