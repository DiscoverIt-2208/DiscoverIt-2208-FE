describe('Splash Page User Flows', () => {
  beforeEach(() => {
    cy.intercept('https://discover-it.herokuapp.com/graphql', {
      method: 'GET',
      fixture: 'places.json'
    })
    cy.visit('http://localhost:3000')
  })

  it('should display background, logo, and pick a city button upon page load', () => {
    cy.get('html').should('have.css', 'background').and('include', 'http://localhost:3000/static/media/DiscoverItBackground.9076687e3ac2cae6ea07.png')
      .get('.splash-logo').should('be.visible')
      .get('.pick-button').should('be.visible')
  })

  it('should go to search by city page when user clicks pick a city button', () => {
    cy.get('.pick-button').click()
    cy.visit('http://localhost:3000/search-page')
  })
})