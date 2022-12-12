describe('Тест страницы String', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/recursion')
    });
    it('Кнока не доуступна при пустом инпуте', () => {
        cy.get('input').should('be.empty')
        cy.get('.string__button').should('be.disabled')
    });
    it('Строка и анимация разворачивается верно', () => {
        const initialString = '12345'
        const initialState = [
            'rgb(210, 82, 225)',
            'rgb(0, 50, 255)',
            'rgb(0, 50, 255)',
            'rgb(0, 50, 255)',
            'rgb(210, 82, 225)'
        ]

        const firstStepString = '52341'
        const firstStepState = [
            'rgb(127, 224, 81)',
            'rgb(210, 82, 225)',
            'rgb(0, 50, 255)',
            'rgb(210, 82, 225)',
            'rgb(127, 224, 81)'
        ]

        const secondStepString = '54321'
        const secondStepState = [
            'rgb(127, 224, 81)',
            'rgb(127, 224, 81)',
            'rgb(127, 224, 81)',
            'rgb(127, 224, 81)',
            'rgb(127, 224, 81)'
        ]

        cy.get('input').type(initialString)
        cy.get('.string__button').should('be.enabled').click()
        cy.get('[data-testid="circleTest"]').each(($el, index, $list) => {
            cy.get($list).should('have.length', 5)
            cy.get($el).contains(initialString[index])
            cy.get($el).should('have.css', 'border-color', initialState[index]);
        })

        cy.wait(500)

        cy.get('[data-testid="circleTest"]').each(($el, index, $list) => {
            cy.get($list).should('have.length', 5)
            cy.get($el).contains(firstStepString[index])
            cy.get($el).should('have.css', 'border-color', firstStepState[index]);
        })

        cy.wait(500)
        
        cy.get('[data-testid="circleTest"]').each(($el, index, $list) => {
            cy.get($list).should('have.length', 5)
            cy.get($el).contains(secondStepString[index])
            cy.get($el).should('have.css', 'border-color', secondStepState[index]);
        })

    })
})

