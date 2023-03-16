/// <reference types = "cypress" />

describe('try the open logout feature',() =>{
    it('visit the website', () => {
        cy.visit('https://www.saucedemo.com/')
    });
    it('try to login ', () => {
        cy.fixture('sauce').then(sauce=>{
            const username = sauce.username
            const password = sauce.password
            
            cy.get('#user-name').clear()
            cy.get('#user-name').type('standard_user')
            cy.get('#password').clear()
            cy.get('#password').type('secret_sauce')
            
            cy.get('#login-button').click()
            cy.url().should('include','inventory.html')
        });    
    });
    it('should try display logout content', () => {
        cy.get('#react-burger-menu-btn').click()
        cy.get('.bm-menu-wrap').should('be.visible')

        cy.get('#logout_sidebar_link').click()

        cy.url().should('include','saucedemo.com')
        
    });
});