Cypress.Commands.add('setSite', site => {
    Cypress.env('site', site);
    cy.fixture(`${site}_user`).then(user => {
        Object.keys(user).forEach(key => {
            Cypress.env('userData')[key] = user[key];
        });
    });
});

Cypress.Commands.add('setFlow', data => {
    Object.keys(data).forEach(key => {
        Cypress.env('flowData')[key] = data[key];
    });
    cy.fixture('site_data').then(sites => {
        Cypress.env('state', sites[Cypress.env('flowData')['site']]['states'][Cypress.env('flowData')['state']]);
    });
    Cypress.env('flows').push(data);
});

Cypress.Commands.add('login', () => {
    cy.access('home');
    cy.clickIfPresent('#newCookieDisclaimerButton');
    cy.get('[data-link-id=login]', { timeout: 10000 }).click();
    cy.clickIfPresent('#change-user-link');
    cy.get('input[type=email]').clear().type(Cypress.env('userData')['name']);
    cy.get('button.andes-button--loud').click();
    cy.get('input[type=password]').clear().type(Cypress.env('userData')['password']);
    cy.get('button[value=complete]').click();
});

Cypress.Commands.add('injectUser', () => {
    let userID = Cypress.env('userData')['id'];
    let data = Cypress.env('flowData');
    data['user'] = userID;

    cy.deleteUser();
    cy.request('POST', 'https://internal-api.mercadolibre.com/seller-migrations/data-access/prepare_users/sbo', data);
});

Cypress.Commands.add('replaceUser', () => {
    let userID = Cypress.env('userData')['id'];
    let data = Cypress.env('flowData');

    cy.request('GET', `https://internal-api.mercadolibre.com/seller-migrations/data-access/user_settings/${userID}`).then(user => {
        cy.request('PUT', 'https://internal-api.mercadolibre.com/seller-migrations/data-access/user_settings', Object.assign(user.body, data));
    });
});

Cypress.Commands.add('deleteUser', () => {
    let userID = Cypress.env('userData')['id'];

    cy.request({ method: 'DELETE', url: `https://internal-api.mercadolibre.com/seller-migrations/data-access/user_settings/${userID}`, failOnStatusCode: false });

    Cypress.env('flowData', {});
});

Cypress.Commands.add('access', (section) => {
    cy.fixture('site_data').then(sites => {
        if (section === 'landing' || section === 'hub') {
            cy.visit(sites[Cypress.env('site')]['baseURL'] + section, {timeout: 15000});
        } else {
            cy.visit(sites[Cypress.env('site')][section], { timeout: 15000 });
        }
    });
});

Cypress.Commands.add('clickIfPresent', selector => {
    cy.get('body').then(body => {
        if (body.find(selector).length > 0) {
            cy.get(selector, { timeout: 5000 }).click();
        }
    });
});

Cypress.Commands.add('checkURL', (selector, section) => {
    cy.fixture('site_data').then(sites => {
        if (section === 'landing' || section === 'hub') {
            cy.get(selector).should('have.attr', 'href', sites[Cypress.env('site')]['baseURL'] + section);
        } else {
            cy.get(selector).should('have.attr', 'href', sites[Cypress.env('site')][section]);
        }
    });
});

Cypress.Commands.add('checkText', (selector, text) => {
    cy.get(selector).should('have.text', text);
});

Cypress.Commands.add('completeStep', step => {
    let userID = Cypress.env('userData')['id'];
    let data = {
        steps: {}
    };
    data.steps[step] = 'COMPLETE';

    cy.request('PUT', `https://internal-api.mercadolibre.com/seller-migrations/data-access/user_settings/${userID}`, data).then(user => {
        Object.keys(user.body).forEach(key => {
            Cypress.env('flowData')[key] = user.body[key];
        });
    });
});

Cypress.Commands.add('refreshFlowData', ()=> {
    let userID = Cypress.env('userData')['id'];

    cy.request('GET', `https://internal-api.mercadolibre.com/seller-migrations/data-access/user_settings/${userID}`).then(user => {
        Object.keys(user.body).forEach(key => {
            Cypress.env('flowData')[key] = user.body[key];
        });
    });
});

Cypress.Commands.add('changeDate', (dateName, newDate) => {
    let userID = Cypress.env('userData')['id'];
    let data = {};
    data[dateName] = newDate;

    cy.request('PUT', `https://internal-api.mercadolibre.com/seller-migrations/data-access/user_settings/${userID}`, data).then(() => {
        Cypress.env('flowData')[dateName] = newDate;
    });
});

Cypress.Commands.add('communicate', () => {
    let userID = Cypress.env('userData')['id'];

    cy.request('PUT', `https://internal-api.mercadolibre.com/seller-migrations/data-access/user_settings/${userID}`, { status: 'IN_PROGRESS' }).then(() => {
        Cypress.env('flowData').status = 'IN_PROGRESS';
    });
});

Cypress.Commands.add('suspend', (suspension) => {
    let userID = Cypress.env('userData')['id'];

    cy.request('PUT', `https://internal-api.mercadolibre.com/seller-migrations/data-access/user_settings/${userID}`, { status: 'SUSPENDED', suspension: suspension }).then(() => {
        Cypress.env('flowData').status = 'SUSPENDED';
        Cypress.env('flowData').suspension = suspension;
    });
});