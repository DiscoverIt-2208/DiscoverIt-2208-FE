describe('Dashboard User Flows', () => {
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
  })

  it('should display nav bar upon page load', () => {
    cy.get('.NavBar-container').should('be.visible')
      .get('.discoverIt-title').should('be.visible')
      .get('.active > h4').should('be.visible')
      .get('[href="/search-page"]').should('be.visible')
      .get('[href="/saved-places"]').should('be.visible')
  })

  it('should display background, city title, and category, next, and back buttons', () => {
    cy.get('html').should('have.css', 'background').and('include', 'http://localhost:3000/static/media/DiscoverItBackground.9076687e3ac2cae6ea07.png')
      .get('.city-name').should('be.visible').and('contain', 'Denver')
      .get('.buttons-container').should('be.visible')
      .get('.place-thumb').should('have.length', 6)
      .get('.buttons-container > :nth-child(1)').should('contain', 'Restaurant')
      .get('.buttons-container > :nth-child(2)').should('contain', 'Entertainment')
      .get('.buttons-container > :nth-child(3)').should('contain', 'History')
      .get('.buttons-container > :nth-child(4)').should('contain', 'Cafe')
      .get('.buttons-container > :nth-child(5)').should('contain', 'Popular')
      .get('.buttons-container > :nth-child(6)').should('contain', 'Accessibility')
      .get('.backPage').should('contain', 'Back')
      .get('.nextPage').should('contain', 'Next')
  })

  it('should display all places for the selected city', () => {
    cy.get('.place-card-box').should('be.visible')
      .get('[href="/Denver/1"]').should('exist')
      .get('[href="/Denver/1"]').find('.card-img').should('have.attr', 'alt', 'Colorado Cattlemen\'s Plaque')
      .get('[href="/Denver/2"]').should('exist')
      .get('[href="/Denver/2"]').find('.card-img').should('have.attr', 'alt', 'National Society of the Army of the Philippines')
      .get('[href="/Denver/3"]').should('exist')
      .get('[href="/Denver/3"]').find('.card-img').should('have.attr', 'alt', "Richard Castro")
      .get('[href="/Denver/4"]').should('exist')
      .get('[href="/Denver/4"]').find('.card-img').should('have.attr', 'alt', 'William Lee Knous')
      .get('[href="/Denver/5"]').should('exist')
      .get('[href="/Denver/5"]').find('.card-img').should('have.attr', 'alt', 'John D. Vanderhoof')
  })

  it('should only display places that match a given category that user selects', () => {
    // cy.get('.buttons-container > :nth-child(3)').click()
    //   .get('.place-thumb').should('have.length', 1)
  })

  it('should only display places that match another category that user selects', () => {
    // cy.get('.buttons-container > :nth-child(1)').click()
    //   .get('.place-thumb').should('have.length', 2)
  })

  it('should only display places that are accessible if user selects category and accessibility', () => {
    // cy.get('.buttons-container > :nth-child(1)').click()
    //   .get('.buttons-container > :nth-child(6)').click()
    //   .get('.place-thumb').should('have.length', 1)
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
    cy.get('[href="/saved-places"] > h4').click()
    cy.visit('http://localhost:3000/saved-places')
  })
})