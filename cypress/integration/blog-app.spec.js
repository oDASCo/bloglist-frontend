describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.visit('http://localhost:3000')
    cy.createUser({ username: 'DASCX', name: 'Darya', password: '232323' })
  })

  it('Login form is shown', function() {
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })
  describe('Login',function() {
      it('succeeds with correct credentials', function() {
         cy.contains('login')
                    cy.get('#username').type('DASCX')
                    cy.get('#password').type('232323')
                    cy.get('#login-button').click()
                    cy.contains('successfully logged in')
                    cy.logout()
      })

      it('fails with wrong credentials', function() {
        cy.contains('login')
            cy.get('#username').type('DASCX')
            cy.get('#password').type('wrong')
            cy.get('#login-button').click()

            cy.contains('login error')
      })
    })
    describe('When logged in', function() {
        beforeEach(function() {
          cy.login({ username: 'DASCX', password: '232323' })
        })

        it('A blog can be created', function() {
          cy.contains('add blog').click()
            cy.get('#blog_title').type('New blog')
            cy.contains('save').click()
           cy.contains('New blog')

        })
          it('A blog can be liked', function() {
                     cy.contains('add blog').click()
                      cy.get('#blog_title').type('New blog')
                      cy.contains('save').click()
                     cy.contains('New blog')
                   cy.get('.show-btn').click()
                   cy.contains('0')
                   cy.contains('like').click()
                   cy.contains('1')
         })
             it('A blog can be deleted', function() {
                              cy.contains('add blog').click()
                               cy.get('#blog_title').type('New blog')
                               cy.contains('save').click()
                              cy.contains('New blog')
                            cy.get('.show-btn').click()
                            cy.contains('remove').click()
                            cy.get('.blog').should('not.exist');
                  })
      })
})
