describe('Dashboard User Flows', () => {
  beforeEach(() => {
    // cy.intercept('', {
    //   method: 'GET',
    //   fixture: '../fixtures/.json'
    // })
    cy.visit('http://localhost:3000/Denver/dashboard')
    //modify this for actual user flow once city is dynamic based on live search
  })

  it('should display nav bar upon page load', () => {
    cy.get('.NavBar-container').should('be.visible')
      .get('.discoverIt-title').should('be.visible')
      .get('.active > h4').should('be.visible')
      .get('[href="/search-page"]').should('be.visible')
      .get('[href="/Denver/saved-places"]').should('be.visible')
      //link above will change to be dynamic - should test for multiple cities
  })

  it('should display background, city title, and category buttons', () => {
    cy.get('html').should('have.css', 'background').and('include', 'http://localhost:3000/static/media/DiscoverItBackground.9076687e3ac2cae6ea07.png')
      .get('.city-name').should('be.visible').and('contain', 'Denver')
      //modify when city name is dynamic and test multiple cities
      .get('.buttons-container').should('be.visible')
      .get('.place-thumb').should('have.length', 5)
      .get('.buttons-container > :nth-child(1)').should('contain', 'Restaurant')
      .get('.buttons-container > :nth-child(2)').should('contain', 'Club')
      .get('.buttons-container > :nth-child(3)').should('contain', 'Bar')
      .get('.buttons-container > :nth-child(4)').should('contain', 'Event')
      .get('.buttons-container > :nth-child(5)').should('contain', 'Mall')
  })

  it('should display all places for the selected city', () => {
    //add fixtures for Denver then intercept and stub once actual site is connected to backend
    //add data for and test for another city
    cy.get('.place-card-container').should('be.visible')
      .get('[href="/Denver/1"]').should('exist')
      .get('[href="/Denver/1"]').find('.card-img').should('have.attr', 'alt', 'dons tavern')
      .get('[href="/Denver/2"]').should('exist')
      .get('[href="/Denver/2"]').find('.card-img').should('have.attr', 'alt', 'Larimer Lounge')
      .get('[href="/Denver/3"]').should('exist')
      .get('[href="/Denver/3"]').find('.card-img').should('have.attr', 'alt', "Scruffy Murphy'\s")
      .get('[href="/Denver/4"]').should('exist')
      .get('[href="/Denver/4"]').find('.card-img').should('have.attr', 'alt', 'Meow Wolf')
      .get('[href="/Denver/5"]').should('exist')
      .get('[href="/Denver/5"]').find('.card-img').should('have.attr', 'alt', 'Cherry Creek Mall')
  })

  it('should only display places that match a given category that user selects', () => {
    //add tests for filter here AFTER functionality added in code
    //Stub and modify data, too, before adding tests
  })

  it('should only display places that match another category that user selects', () => {
     //add tests for filter here AFTER functionality added in code
      //Stub and modify data, too, before adding tests
  })

  it('should navigate to splash page if user clicks DiscoverIt in nav bar', () => {
    cy.get('.discoverIt-title').click()
    cy.visit('http://localhost:3000')
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

  it('should navigate to details page for a specific place when user clicks to select', () => {
    cy.get('[href="/Denver/4"]').click()
    cy.visit('http://localhost:3000/Denver/4')
  })

  it('should navigate to details page for another place when user clicks to select', () => {
    cy.get('[href="/Denver/3"]').click()
    cy.visit('http://localhost:3000/Denver/3')
  })
})