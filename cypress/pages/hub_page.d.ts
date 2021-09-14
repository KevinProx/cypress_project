export type StepCardContent = {
    status: 'INITIAL' | 'COMPLETE',
    title: string,
    text?: string,
    buttons?: Array<string>
}

export function checkHeaderTitle(text: string): void;
export function checkHeaderSubtitle(text: string): void;
export function checkHeaderWarningMessage(text: string): void;
export function checkHeaderSuspensionMessage(text: string): void;
export function checkHelpButton(text: string): void;
export function checkStepsContent(steps: Array<StepCardContent>): void;
export function checkCongratsTitle(text: string): void;
export function checkCongratsSubtitle(text: string): void;
export function checkCongratsButton(text: string): void;
export function checkFooterLinkContent(text: string): void;
