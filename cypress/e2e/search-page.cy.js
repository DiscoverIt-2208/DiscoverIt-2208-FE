const { toContainElement } = require("@testing-library/jest-dom/dist/matchers")

describe('Search Page User Flows', () => {
  beforeEach(() => {
    // cy.intercept('', {
    //   method: 'GET',
    //   fixture: '../fixtures/.json'
    // })
    cy.visit('http://localhost:3000/search-page')
  })

  it('should display nav bar upon page load', () => {
    cy.get('.NavBar-container').should('be.visible')
      .get('.discoverIt-title').should('be.visible')
      .get('[href="/Denver/dashboard"] > h4').should('be.visible')
      .get('.active > h4').should('be.visible')
      .get('[href="/Denver/saved-places"]').should('be.visible')
  })

  it('should display background, logo, and live search bar upon page load', () => {
    cy.get('html').should('have.css', 'background').and('include', 'http://localhost:3000/static/media/DiscoverItBackground.9076687e3ac2cae6ea07.png')
      .get('.searchPage-logo').should('be.visible')
      .get('.search-input').should('be.visible')
  })

  it('should show user input in search bar as user types', () => {
    cy.get('[placeholder="Enter City Name..."]')
      .type('De')
      .should('have.value', "De")
      .type('nver')
      .should('have.value', "Denver")
  })

  it('should display live search results as user types', () => {
    cy.get('[placeholder="Enter City Name..."]')
      .type('Denver,')
      .get('.auto-complete-items').should('be.visible')
      .get('#0.search-result').should('contain', 'Denver, CO, United States of America')
      .get('#1.search-result').should('contain', 'Denver, IA 50622, United States of America')
      .get('#2.search-result').should('contain', 'Denver City, TX 79323, United States of America')
      //does three search results feel like enough to test here?
  })

  it('should navigate to dashboard for city that user selects upon click', () => {
    //not yet functional, come back later to add test
  })
})