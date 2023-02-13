const { faVoteYea } = require("@fortawesome/free-solid-svg-icons")

describe('Details Page User Flows', () => {
  beforeEach(() => {
    // cy.intercept('', {
    //   method: 'GET',
    //   fixture: '../fixtures/.json'
    // })
    cy.visit('http://localhost:3000/Denver/dashboard')
    //modify this for actual user flow once city is dynamic based on live search
    cy.get('[href="/Denver/4"]').click()
    cy.visit('http://localhost:3000/Denver/4')
  })

  it('should display nav bar upon page load', () => {
    cy.get('.NavBar-container').should('be.visible')
      .get('.discoverIt-title').should('be.visible')
      .get('[href="/Denver/dashboard"]').should('be.visible')
      .get('[href="/search-page"]').should('be.visible')
      .get('[href="/Denver/saved-places"]').should('be.visible')
  })

  it ('should display background, back button, and save button upon page load', () => {
    cy.get('html').should('have.css', 'background').and('include', 'http://localhost:3000/static/media/DiscoverItBackground.9076687e3ac2cae6ea07.png')
      .get('.backButton').should('be.visible')
      .get('.detailsButtons').should('be.visible')
  })

  it ('should display all name, image, phone, hours, address, and description of place upon page load', () => {
    cy.get('.detailsTitle').should('contain', 'Meow Wolf')
      .get('.detailsImage').should('have.attr', 'alt', 'Meow Wolf')
      .get('.infoText').should('contain', 'Phone: 863.957.2046')
      .get('.infoText').should('contain', 'Hours: 0900 - 2200')
      .get('.infoText').should('contain', 'Address: 78923 dooby drive, Denver, CO')
      .get('.infoText').should('contain', 'Description: place to have fun')
  })

  it ('should navigate back to dashboard when user clicks back button', () => {
    cy.get('.backButton').click()
      .visit('http://localhost:3000/Denver/dashboard')
  })

  it ('should save place when user clicks save button', () => {
    cy.get('.detailsButtons').click()
    //will it remove the place from this view?? what lets the user know it is saved??
     //navigate to saved places
    //show that the new place is in saved places
  })

  it('should navigate to splash page if user clicks DiscoverIt in nav bar', () => {
    cy.get('.discoverIt-title').click()
    cy.visit('http://localhost:3000')
  })

  it('should navigate to dashboard if user clicks Dashboard in nav bar', () => {
    cy.get('[href="/Denver/dashboard"] > h4').click()
    cy.visit('http://localhost:3000/Denver/dashboard')
  })

  it('should navigate to search page if user clicks Pick a City in nav bar', () => {
    cy.get('[href="/search-page"] > h4').click()
    cy.visit('http://localhost:3000/search-page')
  })

  it('should navigate to saved places page if user clicks saved places in nav bar', () => {
    cy.get('[href="/Denver/saved-places"] > h4').click()
    //link above will change to be dynamic 
    cy.visit('http://localhost:3000/Denver/saved-places')
    //Need to change this once the dashboard is dynamic as it will not be Denver saved places
    //What will display if no places have been saved (sad path)
  })
})