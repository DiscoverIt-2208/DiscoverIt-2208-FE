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
      //link above will change to be dynamic - should test for multiple cities
      .get('.active > h4').should('be.visible')
      .get('[href="/Denver/saved-places"]').should('be.visible')
          //link above will change to be dynamic - should test for multiple cities
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

  it('should navigate to splash page if user clicks DiscoverIt in nav bar', () => {
    cy.get('.discoverIt-title').click()
    cy.visit('http://localhost:3000')
  })

  it('should navigate to dashboard if user clicks dashboard in nav bar', () => {
    cy.get('[href="/Denver/dashboard]" > h4').click()
    //link above will change to be dynamic
    cy.visit('http://localhost:3000/Denver/dashboard')
    //Need to change this once the dashboard is dynamic as it will not be Denver dashboard
    //Where will it go if no city has been chosen yet for this user? (sad path)
  })

  it('should navigate to saved places page if user clicks saved places in nav bar', () => {
    cy.get('[href="/Denver/saved-places]" > h4').click()
    //link above will change to be dynamic 
    cy.visit('http://localhost:3000/Denver/saved-places')
    //Need to change this once the dashboard is dynamic as it will not be Denver saved places
    //What will display if no places have been saved (sad path)
  })
})