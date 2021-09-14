function checkList(containerSelector, childrenSelector, content) {
    cy.get(containerSelector).find(childrenSelector).then(cards => {
        expect(cards).to.have.length(content.length);

        cards.each((index, card) => {
            expect(card).to.have.text(content[index].text);

            if (content[index].links) {
                cy.wrap(card).find('a').then(links => {
                    links.each((idx, link) => {
                        expect(link).to.have.text(content[index].links[idx]['text']);
                        cy.wrap(link).should('have.attr', 'href', content[index].links[idx].URL);
                    });
                });
            }
        });
    });
}

module.exports = {
    checkHeaderTitle: text => {
        cy.checkText('.header-landing-container__title', text);
    },

    checkHeaderSubtitle: text => {
        cy.checkText('.header-landing-container__subtitle', text);
    },

    checkHeaderButtonContent: text => {
        cy.checkText('a.header-landing-container__action', text);
        cy.checkURL('a.header-landing-container__action', 'hub');
    },

    checkBenefitsTitle: text => {
        cy.checkText('.benefit-landing-container__title', text);
    },

    checkBenefitsCards: content => {
        checkList('.benefit-landing-container .card-landing-container', '.card-landing-container__card', content);
    },

    checkStateTitle: text => {
        cy.checkText('.header-state-landing__title', text);
    },

    checkStateSubtitle: (text, link = {}) => {
        cy.checkText('.header-state-landing__subtitle', text);

        if (link) {
            cy.get('.header-state-landing__subtitle').find('a').then(element => {
                expect(element).to.have.text(link.text);
                cy.wrap(element).should('have.attr', 'href', link.URL);
            });
        }
    },

    checkHowToTitle: text => {
        cy.checkText('.how-to-landing__title', text);
    },

    checkHowToSteps: content => {
        checkList('.how-to-landing__cards', '.how-to-landing__cards-item', content);
    },

    checkWarningText: text => {
        cy.checkText('.warning-suspension-landing__subtitle', text);
    },

    checkMiddleActionTitle: text => {
        cy.checkText('.middle-action-landing__title', text);
    },

    checkMiddleActionButtonContent: text => {
        cy.checkText('a.middle-action-landing__action', text);
        cy.checkURL('a.middle-action-landing__action', 'hub');
    },

    checkFAQsTitle: text => {
        cy.checkText('.sm-list-items__title', text);
    },

    checkFAQsContent: (faqs) => {
        let titles = faqs.map(item => ({ text: item.title }));
        let texts = faqs.map(item => ({ text: item.text, links: item.links }));

        checkList('.sm-list-items__content', '.andes-list__item-primary', titles);
        checkList('.sm-list-items__content', '.card-collapse__subtitle', texts);
    },

    checkLastActionText: text => {
        cy.checkText('.last-action-landing__title', text);
    },

    checkLastActionButtonContent: text => {
        cy.get('a.last-action-landing__action').then(links => {
            expect(links[0]).to.have.text(text);
            cy.fixture('site_data').then(sites => {
                cy.wrap(links[0]).should('have.attr', 'href', sites[Cypress.env('site')]['baseURL'] + 'hub');
            });
        });
    },

    checkLastActionLinkContent: (text, link) => {
        cy.get('a.last-action-landing__action').then(links => {
            expect(links[1]).to.have.text(text);
            cy.wrap(links[1]).should('have.attr', 'href', link);
        });
    }
};