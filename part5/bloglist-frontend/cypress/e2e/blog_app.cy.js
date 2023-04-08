describe('Blog ', function() {
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)

    const user = {
      name: 'Richard Roe',
      username: 'richard',
      password: 'password'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users/`, user)

    cy.visit('')
  })

  it('front page can be opened', function() {
    cy.contains('Blogs')
  })

  it('login form is shown', function() {
    cy.contains('login').click()
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('richard')
      cy.get('#password').type('password')
      cy.get('#login-button').click()

      cy.contains('Richard Roe logged in')
    })

    it('fails with wrong credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('richard')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error').should('contain', 'wrong username or password')
    })

  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'richard', password: 'password' })
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('End-to-End testing with Cypress')
      cy.get('#author').type('Cypress')
      cy.get('#url').type('https://www.cypress.io/')
      cy.contains('create').click()

      cy.contains('End-to-End testing with Cypress')
    })
  })

})
