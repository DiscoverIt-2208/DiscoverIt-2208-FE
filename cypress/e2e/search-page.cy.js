describe('Search Page User Flows', () => {
  beforeEach(() => {
    cy.intercept('https://discover-it.herokuapp.com/graphql', {
      method: 'GET',
      fixture: 'places.json'
    })
    cy.intercept('https://api.geoapify.com/v1/geocode/autocomplete?lang=en&limit=10&type=city&text=${searchInput}&apiKey=7ea7d5b3e7214f178782e2a2fc4cf79d', {
      method: 'GET',
      fixture: 'citysearch.json'
    })
    cy.visit('http://localhost:3000/search-page')
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
      .type('Den')
      .get('.auto-complete-items').should('be.visible')
      .get('.search-result').should('have.length', 10)
      .get('#0.search-result').should('contain', 'Denver, CO, United States of America')
      .get('#1.search-result').should('contain', 'Denison, TX 75020, United States of America')
      .get('#2.search-result').should('contain', 'Denton, TX, United States of America')
  })

  it('should not display live search results if there are more than 60 results', () => {
    cy.get('[placeholder="Enter City Name..."]')
      .type('De')
      .get('.auto-complete-items').should('exist')
      .get('#0.search-result').should('not.exist')
      .get('#1.search-result').should('not.exist')
      .get('#2.search-result').should('not.exist')
  })

  it('should navigate to dashboard for city that user selects upon click', () => {
    cy.get('[placeholder="Enter City Name..."]')
      .type('Den')
      .get('#0.search-result').click()
      cy.intercept('https://discover-it.herokuapp.com/graphql', {
        method: 'GET',
        fixture: 'places.json'
      })
      .get('.exploreCity').click()
  })
})