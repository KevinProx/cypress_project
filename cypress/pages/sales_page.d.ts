export type LinkContent = {
    text: string,
    URL: string
};
export type TextContent = {
    text: string,
    links?: Array<LinkContent>
}

export function checkMessageTitle(modifier: 'large' | 'short', text: string): void;
export function checkMessageTextContent(modifier: 'large' | 'short', content: TextContent): void;
export function checkMainCTA(text: string): void;
export function checkSecondaryCTA(text: string): void;
export function checkButtonGroup(texts: Array<string>): void
export function checkAlertMainCTA(text: string): void;
