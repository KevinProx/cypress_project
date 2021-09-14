export type Logistic = 'PLACES' | 'CROSS_DOCKING';
export type FlowType = 'MIGRATION' | 'UPGRADE' | 'DOWNGRADE';
export type Site = 'MCO' | 'MLA' | 'MLB' | 'MLC' | 'MLM';
export type DocType = 'CPF' | 'CNPJ';
export type Partner = 'MULTIPLE' | 'AGILIZE';

export type Flow = {
    site: Site,
    logistic: Logistic,
    flow_type: FlowType,
    state: string,
    activation_date: string,
    communication_date: string,
    limit_date: string,
    doc_type: DocType | undefined,
    mandatory: boolean,
    cdt: boolean,
    incentive: boolean,
    partner: Partner | undefined,
    carrier_id: string | undefined,
    place_id: string | undefined,
    created_by: string
};

export function buildFlowData(
    site: Site,
    logistic: Logistic,
    flow_type: FlowType,
    mandatory: boolean,
    cdt?: boolean,
    partner?: Partner | '',
    doc_type?: DocType | '',
    incentive?: boolean
): Flow;