export type LinkContent = {
    text: string,
    URL: string
};
export type CardContent = {
    title?: string,
    text: string,
    links?: Array<LinkContent>
}

export function checkHeaderTitle(text: string): void;
export function checkHeaderSubtitle(text: string): void;
export function checkHeaderButtonContent(text: string): void;
export function checkBenefitsTitle(text: string): void;
export function checkBenefitsCards(content: Array<CardContent>): void;
export function checkStateTitle(text: string): void;
export function checkStateSubtitle(text: string, link?: LinkContent): void;
export function checkHowToTitle(text: string): void;
export function checkHowToSteps(content: Array<CardContent>): void;
export function checkWarningText(text: string): void;
export function checkMiddleActionTitle(text: string): void;
export function checkMiddleActionButtonContent(text: string): void;
export function checkFAQsTitle(text: string): void;
export function checkFAQsContent(faqs: Array<CardContent>): void;
export function checkLastActionText(text: string): void;
export function checkLastActionButtonContent(text: string): void;
export function checkLastActionLinkContent(text: string, link: string): void;
