/// <reference types= "cypress"/>

describe('Test the remove feature and continue shopping',()=>{
    it('visit the website', () => {
        cy.visit('https://www.saucedemo.com/')
    });

    it('try to login in the website', () => {
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
    it('try to test on the remove button', () => {
        cy.get('#add-to-cart-sauce-labs-backpack').click()
        cy.get('#remove-sauce-labs-backpack').click()
        cy.get('.inventory_item_name').should('contain.text', 'Sauce Labs Backpack')
    });
    it('try to test on the continue button', () => {
        cy.get('.shopping_cart_container').click()
        cy.get('.cart_desc_label').should('contain.text','DESCRIPTION')
        cy.get('#continue-shopping').click()
        cy.get('span').should('contain.text', 'Products')   
    });

});