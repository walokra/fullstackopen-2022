describe('Blog ', function() {
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)

    const users = [{
      name: 'Richard Roe',
      username: 'richard',
      password: 'password'
    },{
      name: 'John Doe',
      username: 'john',
      password: 'password'
    }]

    users.forEach(user => {
      cy.request('POST', `${Cypress.env('BACKEND')}/users/`, user)
    })

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
      cy.login({ username: 'john', password: 'password' })
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('End-to-End testing with Cypress')
      cy.get('#author').type('Cypress')
      cy.get('#url').type('https://www.cypress.io/')
      cy.contains('create').click()

      cy.contains('End-to-End testing with Cypress')
    })

    describe('and a blog exists', function () {
      beforeEach(function () {
        const blog = {
          title: 'Best Practices for End-to-End Testing with Cypress',
          author: 'Cypress',
          url: 'https://docs.cypress.io/guides/references/best-practices',
          likes: 1,
        }

        cy.createBlog(blog)
      })

      it('it can be liked', function () {
        cy.contains('Best Practices for End-to-End Testing with Cypress')
          .contains('view')
          .click()

        cy.contains('like')
          .click()

        cy.contains('Best Practices for End-to-End Testing with Cypress')
          .contains('likes: 2')
      })

      it('it can be removed by creator', function () {
        cy.contains('Best Practices for End-to-End Testing with Cypress')
          .contains('view')
          .click()

        cy.contains('remove')
          .click()

        cy.on('window:confirm', () => true)

        cy.contains('blog removed')

        cy.contains('Best Practices for End-to-End Testing with Cypress').should('not.exist')
      })

      it('only creator sees remove button', function () {
        // Change user
        cy.contains('logout').click()
        cy.login({ username: 'richard', password: 'password' })

        cy.contains('Best Practices for End-to-End Testing with Cypress')
          .contains('view')
          .click()

        cy.contains('remove').should('not.exist')
      })
    })

    describe('and multiple blogs are sorted', function () {
      beforeEach(function () {
        const blogs = [{
          title: 'Best Practices for End-to-End Testing with Cypress',
          author: 'Cypress',
          url: 'https://docs.cypress.io/guides/references/best-practices',
          likes: 1,
        },
        {
          title: 'End-to-End testing with Cypress',
          author: 'Cypress',
          url: 'https://www.cypress.io/',
          likes: 2,
        },
        {
          title: 'Playwright or Cypress which is better?',
          author: 'Playwright',
          url: 'https://www.playwright.io/',
          likes: 2,
        }]

        blogs.forEach(blog => {
          cy.createBlog(blog)
        })
      })

      it('liked blog is sorted first', function () {
        cy.get('.blog').eq(0).should('contain', 'End-to-End testing with Cypress')

        cy.contains('Playwright or Cypress which is better?')
          .contains('view')
          .click()

        cy.contains('Playwright or Cypress which is better?')
          .contains('like')
          .click()

        cy.get('.blog').eq(0).should('contain', 'Playwright or Cypress which is better?')
      })
    })
  })

})
