import {BadRequestException, Injectable} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import EmailService from "./email.service";
import {emailConfig} from "../../config/email.config";
import {urlConfig} from "../../config/url.config";
import {jwtConfig} from "../../config/jwt.config";
import {Reservation} from "../../domain/model/reservation.entity";

@Injectable()
export class EmailReservationReturnedService {
    constructor(
      private readonly jwtService: JwtService,
      private readonly emailService: EmailService,
    ) {}

    public sendConfirmationMail(reservation: Reservation): void {
        const token = this.jwtService.sign({ email: reservation.user.email });

        const unsubscribeUrl = `${urlConfig.unsubscribeUrl}?token=${token}`;

        return this.emailService.sendMail({
            from: emailConfig.emailUser,
            to: reservation.user.email,
            subject: `La Ludosaure - Votre réservation a été retournée`,
            html: `<!DOCTYPE html>
                    <html lang="">
                    <head>
                    
                      <meta charset="utf-8">
                      <title>Votre réservation a été retournée</title>
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
                    
                    <a href="//TODO rediriger vers site" target="_blank">
                      <img src="https://kengo.bzh/media/image/aaf9a0e8-b90f-4727-8d5d-1b94ab6f7a6c_sticker-kengojpg.jpg"
                           alt="Logo" width="150"
                           style=" width: 150px; max-width: 150px; min-width: 48px;margin: 25px auto;display: block">
                    </a>
                    <div style="width: 100%;">
                      <div style="background-color:#ffffff; margin: auto; display: block; max-width: 600px; padding: 36px 24px 0;
                            font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; border-top: 3px solid #d4dadf;">
                        <h1 style="margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -1px; line-height: 48px;">
                          Votre réservation du ${reservation.startDate.toLocaleString()} au ${reservation.endDate.toLocaleString()} a été retournée
                        </h1>
                        <p class="text">
                            Bonjour ${reservation.user.firstname} ${reservation.user.lastname},<br><br>
                            Les jeux de la réservation du ${reservation.startDate.toLocaleString()} au ${reservation.endDate.toLocaleString()} ont bien été retournés.<br>
                            Merci encore pour votre confiance et nous espérant vous revoir bientôt.<br><br>
                            Si vous avez des questions, n'hésitez pas à nous contacter par mail à l'adresse suivante : <b>laludosaure@gmail.com</b>
                        <div style="padding: 24px"></div>
                      </div>
                    
                      <div style="background-color: #e9ecef; margin: auto; display: block; max-width: 600px; padding: 24px;
                            font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; border-top: 3px solid #d4dadf; text-align: center">
                        <p class="footer-text">
                          Vous avez reçu cet email suite au retour des jeux de votre réservation.
                        </p>
                        <p class="footer-text">
                          Pour ne plus recevoir d'autres emails de notre part, vous pouvez
                          <a href="${unsubscribeUrl}" target="_blank">vous désabonner</a> à tout moment.
                        </p>
                        <p class="footer-text">
                          2 BIS Boulevard Cahours, Janzé, France
                        </p>
                        <p class="footer-text"></p>
                      </div>
                    </div>
                    
                    </body>
                    </html>`,
        })
    }
}
