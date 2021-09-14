const moment = require('moment');

function today() {
    return moment();
}

module.exports = {
    today,
    format: date => {
        return moment(date).format('YYYY-MM-DD');
    },

    todayPlus: days => {
        return today().add('days', days);
    },

    translate: date => {
        let format = 'D [de] MMMM';

        if (Cypress.env('site') === 'MLB') {
            return moment(date).locale('pt').format(format);
        } else {
            return moment(date).locale('es').format(format);
        }
    },

    weekDay: date => {
        let format = 'dddd';

        if (Cypress.env('site') === 'MLB') {
            return moment(date).locale('pt').format(format);
        } else {
            return moment(date).locale('es').format(format);
        }
    },

    difference: date => {
        return moment(date).endOf('day').diff(today().startOf('day'), 'days');
    }
};