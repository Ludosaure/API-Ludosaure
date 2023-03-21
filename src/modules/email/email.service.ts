import {Injectable, Logger} from '@nestjs/common';
import {createTransport} from 'nodemailer';
import * as Mail from 'nodemailer/lib/mailer';
import {emailConfig} from "../../config/email.config";

const logger = new Logger('bootstrap');
@Injectable()
export default class EmailService {
    private nodemailerTransport: Mail;

    constructor() {
        this.nodemailerTransport = createTransport({
            service: emailConfig.emailService,
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: emailConfig.emailUser,
                pass: emailConfig.generatedEmailPassword,
            }
        });
    }

    sendMail(options: Mail.Options) {
        return this.nodemailerTransport.sendMail(options, function (error, info) {
            if (error) {
                logger.error('Error in sending email  ' + error);
                return true;
            } else {
                logger.log('Email sent: ' + info.response);
                return false;
            }
        });
    }
}
