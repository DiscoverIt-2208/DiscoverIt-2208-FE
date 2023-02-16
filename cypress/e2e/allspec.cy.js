describe('Splash Page User Flows', () => {
  beforeEach(() => {
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

describe('Search Page User Flows', () => {
  beforeEach(() => {
    cy.intercept('https://api.geoapify.com/v1/geocode/autocomplete?lang=en&limit=10&type=city&text=D&apiKey=7ea7d5b3e7214f178782e2a2fc4cf79d', {})
    cy.intercept('https://api.geoapify.com/v1/geocode/autocomplete?lang=en&limit=10&type=city&text=De&apiKey=7ea7d5b3e7214f178782e2a2fc4cf79d', {})
    cy.intercept('https://api.geoapify.com/v1/geocode/autocomplete?lang=en&limit=10&type=city&text=Den&apiKey=7ea7d5b3e7214f178782e2a2fc4cf79d', {
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
    cy.get('[placeholder="Enter City Name..."]').type('De').should('have.value', 'De')
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
})

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
    cy.get('[href="/Denver/3"]').click()
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
    cy.get('.detailsTitle').should('contain', 'Richard Castro')
      .get('.detailsImage').should('have.attr', 'alt', 'Default')
      .get('.infoText').should('contain', 'Phone: +1 303 706 1919')
      .get('.infoText').should('contain', 'Hours: 24/7')
      .get('.infoText').should('contain', 'Address: Richard Castro, 200 East Colfax Avenue, Denver, CO 80203, United States of America')
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
    cy.get('[href="/saved-places"] > h4').click()
    cy.visit('http://localhost:3000/saved-places')
  })
})





