import * as process from 'process';

export interface IStripeConfig {
    stripeSecretKey: string;
    stripeCurrency: string;

}

export class StripeConfig implements IStripeConfig {
    stripeSecretKey: string;
    stripeCurrency: string;

    constructor() {
        this.stripeSecretKey = process.env.STRIPE_SECRET_KEY;
        this.stripeCurrency = process.env.STRIPE_CURRENCY;
    }
}

export const stripeConfig = new StripeConfig();
