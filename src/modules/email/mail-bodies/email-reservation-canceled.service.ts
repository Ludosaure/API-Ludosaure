import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import EmailService from "../email.service";
import { emailConfig } from "../../../config/email.config";
import { Reservation } from "../../../domain/model/reservation.entity";
import { EmailFooter } from "./footer/email-footer";
import { AppUtils } from "../../../shared/appUtils";

@Injectable()
export class EmailReservationCanceledService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly emailService: EmailService,
    ) {}

    public sendCancellationMail(reservation: Reservation): void {
        const token = this.jwtService.sign({ email: reservation.user.email });

        return this.emailService.sendMail({
            from: emailConfig.emailUser,
            to: reservation.user.email,
            subject: `La Ludosaure - Réservation #${reservation.reservationNumber} annulée`,
            html: `<!DOCTYPE html>
                    <html lang="">
                    <head>
                    
                      <meta charset="utf-8">
                      <title>Votre réservation #${reservation.reservationNumber} a été annulée</title>
                      <style>
                          @media screen {
                              @font-face {
                                  font-family: 'Source Sans Pro';
                                  font-style: normal;
                                  font-weight: 400;
                                  src: local('Source Sans Pro Regular'), local('SourceSansPro-Regular'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/ODelI1aHBYDBqgeIAH2zlBM0YzuT7MdOe03otPbuUS0.woff) format('woff');
                              }
                              @font-face {
                                  font-family: 'Source Sans Pro';
                                  font-style: normal;
                                  font-weight: 700;
                                  src: local('Source Sans Pro Bold'), local('SourceSansPro-Bold'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/toadOcfmlt9b38dHJxOBGFkQc6VGVFSmCnC_l7QZG60.woff) format('woff');
                              }
                          }
                    
                          a {
                              color: #1a82e2;
                          }
                    
                          .text {
                              margin: 0;
                              padding: 24px;
                              font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif;
                              font-size: 16px;
                              line-height: 28px;
                          }
                    
                          .footer-text {
                              padding-top: 8px;
                              padding-left: 12px;
                              padding-right: 12px;
                              font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif;
                              font-size: 14px;
                              line-height: 20px;
                              color: #666;
                          }
                      </style>
                    </head>
                    <body style="background-color: #e9ecef;">
                    
                    <img src="${AppUtils.logoUrl}"
                       alt="Logo" width="150"
                       style=" width: 150px; max-width: 150px; min-width: 48px;margin: 25px auto;display: block">
                    </a>
                    <div style="width: 100%;">
                      <div style="background-color:#ffffff; margin: auto; display: block; max-width: 600px; padding: 36px 24px 0;
                            font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; border-top: 3px solid #d4dadf;">
                        <h1 style="margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -1px; line-height: 48px;">
                          Votre réservation #${reservation.reservationNumber} a été annulée
                        </h1>
                        <p class="text">
                            Bonjour ${reservation.user.firstname} ${reservation.user.lastname},<br><br>
                            Nous vous informons que votre réservation #${reservation.reservationNumber} censée débuter le ${reservation.startDate.toLocaleString()} et se terminer le ${reservation.endDate.toLocaleString()} a été annulée.<br>
                            Cette annulation a été effectuée par un de nos administrateurs.<br>
                            Si vous avez des questions, n'hésitez pas à nous contacter par mail à l'adresse suivante : <b>laludosaure@gmail.com</b>
                        <div style="padding: 24px"></div>
                      </div>
                      ${EmailFooter.getFooter(token, "à l'annulation d'une commande sur notre site ou notre application")}
                    </div>
                    
                    </body>
                    </html>`,
        })
    }
}
