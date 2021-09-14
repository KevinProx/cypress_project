module.exports = {
    checkHeaderTitle: text => {
        cy.checkText('.hub-header__texts-title', text);
    },

    checkHeaderSubtitle: text => {
        cy.checkText('.hub-header__texts-subtitle', text);
    },

    checkHeaderWarningMessage: text => {
        cy.checkText('.andes-message__text--warning', text);
    },

    checkHeaderSuspensionMessage: text => {
        cy.checkText('.andes-message__text--error', text);
    },

    checkHelpButton: text => {
        cy.checkText('.sm-help-button', text);
    },

    checkStepsContent: steps => {
        cy.get('.hub-steps-card__content').then(cards => {
            expect(cards).to.have.length(steps.length);

            cards.each((index, card) => {
                if (steps[index].status === 'COMPLETE') {
                    cy.wrap(card).find('.image').should('have.class', 'image--success');
                } else {
                    cy.wrap(card).find('.image').should('not.have.class', 'image--success');
                }

                cy.wrap(card).find('.hub-steps-card__infos-title').should('have.text', steps[index].title);

                if (steps[index].text) {
                    cy.wrap(card).find('.hub-steps-card__infos-subtitle').should('have.text', steps[index].text);
                }

                if (steps[index].buttons) {
                    cy.wrap(card).find('.button-link-container').then(buttons => {
                        buttons.each((idx, button) => {
                            expect(button).to.have.text(steps[index].buttons[idx]);
                        });
                    });
                }
            });
        });
    },

    checkCongratsTitle: text => {
        cy.checkText('.congrats-card__infos-title', text);
    },

    checkCongratsSubtitle: text => {
        cy.checkText('.congrats-card__infos-subtitle', text);
    },

    checkCongratsButton: text => {
        cy.checkText('.congrats-card__actions > .button-link-container > a', text);
        cy.checkURL('.congrats-card__actions > .button-link-container > a', 'sales');
    },

    checkFooterLinkContent: text => {
        cy.checkText('.footer-link-container', text);
        cy.checkURL('.footer-link-container a', 'landing');
    }
};