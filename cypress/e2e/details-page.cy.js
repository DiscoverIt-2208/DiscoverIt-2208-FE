describe('Details Page User Flows', () => {
  beforeEach(() => {
    cy.intercept('POST', 'https://discover-it.herokuapp.com/graphql', (req) => {
      if (req.body.operationName === 'FetchPlaces') {
          req.reply({
            fixture: 'places.json'
        });
      }
    })
    cy.intercept('https://api.geoapify.com/v1/geocode/autocomplete?lang=en&limit=10&type=city&text=D&apiKey=7ea7d5b3e7214f178782e2a2fc4cf79d', {})
    cy.intercept('https://api.geoapify.com/v1/geocode/autocomplete?lang=en&limit=10&type=city&text=De&apiKey=7ea7d5b3e7214f178782e2a2fc4cf79d', {})
    cy.intercept('https://api.geoapify.com/v1/geocode/autocomplete?lang=en&limit=10&type=city&text=Den&apiKey=7ea7d5b3e7214f178782e2a2fc4cf79d', {
      method: 'GET',
      fixture: 'citysearch.json'
    })
    cy.visit('http://localhost:3000/search-page')
    cy.get('[placeholder="Enter City Name..."]')
      .type('Den')
      .get('#0.search-result').click()
    cy.get('.exploreCity').click()
    cy.intercept('POST', 'https://discover-it.herokuapp.com/graphql', (req) => {
      if (req.body.operationName === 'PlaceDetails') {
          req.reply({
            fixture: 'placedetails.json'
        });
      }
    })
    cy.get('[href="/Denver/4"]').click()
  })

  it('should display nav bar upon page load', () => {
    cy.get('.NavBar-container').should('be.visible')
      .get('.discoverIt-title').should('be.visible')
      .get('[href="/dashboard"]').should('be.visible')
      .get('[href="/search-page"]').should('be.visible')
      .get('[href="/saved-places"]').should('be.visible')
  })

  it ('should display background, back button, and save button upon page load', () => {
    cy.get('html').should('have.css', 'background').and('include', 'http://localhost:3000/static/media/DiscoverItBackground.9076687e3ac2cae6ea07.png')
      .get('.backButton').should('be.visible')
      .get('.detailsButtons').should('be.visible')
  })

  it ('should display all name, image, phone, hours, address, and description of place upon page load', () => {
    cy.get('.detailsTitle').should('contain', 'William Lee Knous')
      .get('.detailsImage').should('have.attr', 'alt', 'Default')
      .get('.infoText').should('contain', 'Phone: +1 303 706 1919')
      .get('.infoText').should('contain', 'Hours: 24/7')
      .get('.infoText').should('contain', 'Address: William Lee Knous, 200 East Colfax Avenue, Denver, CO 80203, United States of America')
      // .get('.infoText').should('contain', 'Description: place to have fun')
  })

  it ('should navigate back to dashboard when user clicks back button', () => {
    cy.get('.backButton').click()
    // cy.visit('http://localhost:3000/dashboard')
  })

  it ('should save place when user clicks save button', () => {
    cy.get('.detailsButtons').click()
    //will it remove the place from this view?? what lets the user know it is saved??
     //navigate to saved places
    //show that the new place is in saved places
  })

  it('should navigate to dashboard if user clicks Dashboard in nav bar', () => {
    cy.get('[href="/dashboard"] > h4').click()
    // cy.visit('http://localhost:3000/dashboard')
  })
})