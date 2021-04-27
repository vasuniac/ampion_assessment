
describe("Verify the Weather API", () => {
    const url = "https://api.openweathermap.org/data/2.5/onecall?lat=-33.8&lon=151.2&exclude=current,hourly,minutely,alerts&units=metric&appid=0db81d3818c66d777b60f4367cd9a9a0"

    it('should display the dates based on weather and temperature criteria', () => {
        // network stubs
        cy.intercept(url, { fixture: 'weather_data_mix_scenarios.json' }).as('getWeatherDataMixScenarios');
        cy.visit('/');
        cy.wait('@getWeatherDataMixScenarios');
        // asserts
        cy.get('[id="temp-table"]').children().its('length').should('eq',2)
        cy.get('[id="weather-table"]').children().its('length').should('eq',1)
        cy.contains('Apr 28 2021').should('be.visible')
        cy.contains('Apr 29 2021').should('be.visible')
        cy.contains('Apr 27 2021').should('be.visible')
        cy.screenshot()
    });

    it('should display all days above 20 degrees celcius', () => {
        // network stubs
        cy.intercept(url, { fixture: 'weather_data_all_days_temp_filtered.json' }).as('getWeatherDataAllDaysAboveTemp');
        cy.visit('/');
        cy.wait('@getWeatherDataAllDaysAboveTemp');
        // asserts
        cy.get('[id="temp-table"]').children().its('length').should('eq',5)
        cy.get('[id="weather-table"]').children().should('have.length', 0)
        cy.contains('Apr 27 2021').should('be.visible')
        cy.contains('Apr 28 2021').should('be.visible')
        cy.contains('Apr 29 2021').should('be.visible')
        cy.contains('Apr 30 2021').should('be.visible')
        cy.contains('May 01 2021').should('be.visible')
        cy.screenshot()
    });

    it('should display all days where weather is Clear', () => {
        // network stubs
        cy.intercept(url, { fixture: 'weather_data_all_days_sunny.json' }).as('getWeatherDataAllDaysSunny');
        cy.visit('/');
        cy.wait('@getWeatherDataAllDaysSunny');
        // asserts
        cy.get('[id="temp-table"]').children().should('have.length', 0)
        cy.get('[id="weather-table"]').children().its('length').should('eq',5)
        cy.contains('Apr 27 2021').should('be.visible')
        cy.contains('Apr 28 2021').should('be.visible')
        cy.contains('Apr 29 2021').should('be.visible')
        cy.contains('Apr 30 2021').should('be.visible')
        cy.contains('May 01 2021').should('be.visible')
        cy.screenshot()
    });

})