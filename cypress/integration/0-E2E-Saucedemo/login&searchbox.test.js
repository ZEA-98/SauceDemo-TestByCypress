/// <reference types = "cypress"/>

describe('Testing the login feature is valid, invalid and search box', () => {
	it('Visit the website', () => {
		cy.visit('https://www.saucedemo.com/')
		cy.url().should('include', 'saucedemo.com')
	})

	it('Login with wrong username', () => {
		cy.get('#user-name').type('arza')
		cy.get('#password').type('secret_sauce')
		cy.get('#login-button').click()
		cy.get('h3').should(
			'contain.text',
			'Epic sadface: Username and password do not match any user in this service'
		)
	})
	it('Login with wrong password', () => {
		cy.get('#user-name').clear()
		cy.get('#user-name').type('standard_user')
		cy.get('#password').clear()
		cy.get('#password').type('arza')
		cy.get('#login-button').click()
		cy.get('h3').should(
			'contain.text',
			'Epic sadface: Username and password do not match any user in this service'
		)
	})
	it('Try to login with valid data', () => {
		cy.fixture('sauce').then(arza => {
			const username = arza.username
			const password = arza.password

			cy.get('#user-name').clear()
			cy.get('#user-name').type('standard_user')
			cy.get('#password').clear()
			cy.get('#password').type('secret_sauce')

			cy.get('#login-button').click()
			cy.url().should('include','inventory.html')
		})
	})
	it('Try the search box', () => {
		cy.get('.product_sort_container').select('Name (Z to A)')
		cy.get('.inventory_item_name').should('be.visible')

		cy.get('.product_sort_container').select('Price (low to high)')
		cy.get('.inventory_item_name').should('contain.text', 'Sauce Labs Onesie')
	})
})
