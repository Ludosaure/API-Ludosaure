import * as process from 'process';

export interface IUrlConfig {
    emailConfirmationUrl: string;
    unsubscribeUrl: string;

}

export class UrlConfig implements IUrlConfig {
    emailConfirmationUrl: string;
    unsubscribeUrl: string;

    constructor() {
        this.emailConfirmationUrl = process.env.EMAIL_CONFIRMATION_URL;
        this.unsubscribeUrl = process.env.UNSUBSCRIBE_URL;
    }
}

export const urlConfig = new UrlConfig();
