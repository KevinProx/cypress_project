import { Flow, Site } from "./flow_utils";

export type Suffix = 'landing' | 'hub';

declare namespace Cypress {
    interface Chainable<Subject> {

        /**
         * Visits the site with the provided suffix, or the home if none is specified
         *
         * @param section
         */
        access(section: Suffix | 'home' | 'sales' | 'summary'): Chainable<any>

        /**
         * Sets the site as global and the user data
         *
         * @param site
         */
        setSite(site: Site): Chainable<any>

        /**
         * Logs in the proper Mercadolibre site
         */
        login(): Chainable<any>

        /**
         * Registers flow data as global
         *
         * @param data
         */
        setFlow(data: Flow): Chainable<any>

        /**
         * Injects user data in the KVS
         */
        injectUser(): Chainable<any>

        /**
         * Replaces user data in the KVS
         */
        replaceUser(): Chainable<any>

        /**
         * Deletes user from the KVS
         */
        deleteUser(): Chainable<any>

        /**
         * Clicks on an element only if it's present
         *
         * @param selector
         */
        clickIfPresent(selector: string): Chainable<any>

        /**
         * Checks if element has the proper href
         *
         * @param selector
         * @param section
         */
        checkURL(selector: string, section: Suffix | 'sales' | 'summary' | 'addresses'): void

        /**
         * Checks the element's inner text
         *
         * @param selector
         * @param text
         */
        checkText(selector: string, text: string): void

        /**
         * Sets step as COMPLETE
         *
         * @param step
         */
        completeStep(step: 'CDT' | 'ADDRESS' | 'BILLING_MYML' | 'COLLECT_DATA'): void

        /**
         * Loads current user settings data as global from the KVS
         */
        refreshFlowData(): void

        /**
         * Changes a date from the KVS
         *
         * @param dateName
         * @param newDate
         */
        changeDate(dateName: 'communication_date' | 'limit_date' | 'activation_date', newDate: string): void

        /**
         * Changes the user status to IN_PROGRESS
         */
        communicate(): void

        /**
         * Changes the user status to SUSPENDED
         */
        suspend(suspension: 'COLLECT' | 'CDT' | 'BILLING'): void
    }
}