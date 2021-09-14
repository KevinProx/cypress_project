import * as dateUtils from "./date_utils";

module.exports = {
    buildFlowData: (site, logistic, flow_type, mandatory, cdt = false, partner = '', doc_type= '', incentive = true) => {
        let flow = {
            'site': site,
            'logistic': logistic,
            'flow_type': flow_type,
            'communication_date': dateUtils.format(dateUtils.today()),
            'limit_date': dateUtils.format(dateUtils.todayPlus(60)),
            'mandatory': mandatory,
            'cdt': cdt,
            'incentive': incentive,
            'created_by': 'test@cypress.com'
        };

        cy.fixture('site_data').then(sites => {
            let [state] = Object.keys(sites[site]['states']);
            flow['state'] = state;
        });

        if (logistic === 'PLACES') {
            flow['carrier_id'] = 'Test Carrier';
            flow['place_id'] = 'Test Place';
            flow['activation_date'] = dateUtils.format(dateUtils.todayPlus(61));
        } else {
            flow['activation_date'] = dateUtils.format(dateUtils.todayPlus(67));
        }

        if (doc_type) {
            flow['doc_type'] = doc_type;
        }

        if (partner) {
            flow['partner'] = partner;
        }

        return flow;
    }
};