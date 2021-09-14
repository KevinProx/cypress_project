module.exports = {
    checkMessageTitle: (modifier, text) => {
        cy.checkText(`.sc-notices-${modifier}-title`, text);
    },

    checkMessageTextContent: (modifier, content) => {
        cy.checkText(`.sc-notices-${modifier}-description`, content.text);

        if (content.links) {
            cy.get(`.sc-notices-${modifier}-description`).find('a').then(links => {
                links.each((index, link) => {
                    expect(link).to.have.text(content.links[index].text);
                    cy.wrap(link).should('have.attr', 'href', content.links[index].URL);
                });
            });
        }
    },

    checkMainCTA: text => {
        cy.checkText('a.andes-button--loud', text);
        cy.checkURL('a.andes-button--loud', 'hub');
    },

    checkSecondaryCTA: text => {
        cy.checkText('a.andes-button--transparent', text);
        cy.checkURL('a.andes-button--transparent', 'landing');
    },

    checkButtonGroup: texts => {
        cy.get('.andes-button--quiet').then(buttons => {
            buttons.each((index, button) => {
                expect(button).to.have.text(texts[index]);

                if (index === 0) {
                    cy.fixture('site_data').then(sites => {
                        cy.wrap(button).should('have.attr', 'href', sites[Cypress.env('site')]['baseURL'] + 'hub');
                    });
                } else {
                    cy.fixture('site_data').then(sites => {
                        cy.wrap(button).should('have.attr', 'href', sites[Cypress.env('site')]['baseURL'] + 'landing');
                    });
                }
            });
        });
    },

    checkAlertMainCTA: text => {
        cy.checkText('a.sc-notices-large-action-button', text);
        cy.checkURL('a.sc-notices-large-action-button', 'hub');
    }
};