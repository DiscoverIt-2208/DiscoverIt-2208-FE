describe('Saved Places Page User Flow', () => {
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
  
  it('should save place when user clicks the save button', () => {
    cy.intercept('POST', 'https://discover-it.herokuapp.com/graphql', (req) => {
      if (req.body.operationName ==='CreateUserFavorite') {
          req.reply({
             fixture: 'saveplace.json'
         });
       }
    });
    cy.intercept('POST', 'https://discover-it.herokuapp.com/graphql', (req) => {
      if (req.body.operationName === 'GetUser') {
          req.reply({
             fixture: 'getuser.json'
         });
       }
    });
    cy.get('.detailsButtons').click()
  })
  it('should navigate to saved places page if user clicks saved places in nav bar', () => {
    // cy.intercept('POST', 'https://discover-it.herokuapp.com/graphql', (req) => {
    //   if (req.body.operationName ==='CreateUserFavorite') {
    //       req.reply({
    //          fixture: 'saveplace.json'
    //      });
    //    }
    // });
    // cy.intercept('POST', 'https://discover-it.herokuapp.com/graphql', (req) => {
    //   if (req.body.operationName === 'GetUsers') {
    //       req.reply({
    //          fixture: 'getuser.json'
    //      });
    //    }
    // });
    // cy.get('.detailsButtons').click()
    cy.get('[href="/saved-places"] > h4').click()
    cy.visit('http://localhost:3000/saved-places')
  })
})

