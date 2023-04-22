import * as process from 'process';

export interface IUrlConfig {
    emailConfirmationAccountUrl: string;
    unsubscribeUrl: string;

}

export class UrlConfig implements IUrlConfig {
    emailConfirmationAccountUrl: string;
    unsubscribeUrl: string;

    constructor() {
        this.emailConfirmationAccountUrl = process.env.EMAIL_CONFIRMATION_ACCOUNT_URL;
        this.unsubscribeUrl = process.env.UNSUBSCRIBE_URL;
    }
}

export const urlConfig = new UrlConfig();
