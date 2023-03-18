import {Injectable, Logger} from '@nestjs/common';
import {createTransport} from 'nodemailer';
import * as Mail from 'nodemailer/lib/mailer';
import {environmentConfig} from "../../config/environment.config";

const logger = new Logger('bootstrap');
@Injectable()
export default class EmailService {
    private nodemailerTransport: Mail;

    constructor() {
        this.nodemailerTransport = createTransport({
            service: environmentConfig.emailService,
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: environmentConfig.emailUser,
                pass: environmentConfig.generatedEmailPassword,
            }
        });
    }

    sendMail(options: Mail.Options) {
        return this.nodemailerTransport.sendMail(options, function (error, info) {
            if (error) {
                logger.log('Error in sending email  ' + error);
                return true;
            } else {
                logger.log('Email sent: ' + info.response);
                return false;
            }
        });
    }
}
