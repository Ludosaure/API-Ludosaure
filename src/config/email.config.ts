import * as process from 'process';

export interface IEmailConfig {
    emailService: string;
    emailUser: string;
    generatedEmailPassword: string;

}

export class EmailConfig implements IEmailConfig {
    emailService: string;
    emailUser: string;
    generatedEmailPassword: string;

    constructor() {
        this.emailService = process.env.EMAIL_SERVICE;
        this.emailUser = process.env.EMAIL_USER;
        this.generatedEmailPassword = process.env.GENERATED_EMAIL_PASSWORD;
    }
}

export const emailConfig = new EmailConfig();
