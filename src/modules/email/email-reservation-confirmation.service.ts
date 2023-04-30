import {BadRequestException, Injectable} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import EmailService from "./email.service";
import {emailConfig} from "../../config/email.config";
import {urlConfig} from "../../config/url.config";
import {jwtConfig} from "../../config/jwt.config";
import {Reservation} from "../../domain/model/reservation.entity";

@Injectable()
export class EmailReservationConfirmationService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly emailService: EmailService,
    ) {}

    public sendConfirmationMail(reservation: Reservation, isUpdate: boolean): void {
        const token = this.jwtService.sign({ email: reservation.user.email });

        const unsubscribeUrl = `${urlConfig.unsubscribeUrl}?token=${token}`;

        return this.emailService.sendMail({
            from: emailConfig.emailUser,
            to: reservation.user.email,
            subject: `La Ludosaure - Confirmation de ${isUpdate ? 'modification de ' : ''}commande`,
            // TODO file attachment with invoice (https://www.learmoreseekmore.com/2022/05/part-3-nestjs-email-with-file-attachemnt.html)
            html: `<!DOCTYPE html>
                    <html lang="">
                    <head>
                    
                      <meta charset="utf-8">
                      <title>Confirmation de commande #${reservation.reservationNumber}</title>
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
                          Confirmation de ${isUpdate ? 'modification de ' : ''}commande #${reservation.reservationNumber}
                        </h1>
                        <h2 style="margin: 0; font-size: 24px; font-weight: 700; letter-spacing: -1px; line-height: 48px;">
                        Merci ${reservation.user.firstname} pour ${isUpdate ? 'la modification de ' : ''}votre commande !
                        </h2>
                        <h3 style="margin: 0; font-size: 18px; font-weight: 700; letter-spacing: -1px; line-height: 48px;">
                          Voici le résumé de votre commande :
                        </h3>
                        <p class="text">
                          <b>Commande #${reservation.reservationNumber}</b><br><br>
                          <b>Date de début :</b> ${reservation.startDate.toLocaleString()}.<br>
                          Vous pourrez venir récupérer vos jeux directement à notre boutique le jour du début de votre commande : <b>2 bis Bd Cahours, 35150 Janzé</b><br>
                          <b>Date de fin :</b> ${reservation.endDate.toLocaleString()}<br>
                          <b>Jeux réservés :</b> ${reservation.games.map(game => game.name).join(', ')}<br> <!-- TODO add pictures of games -->
                          ${reservation.appliedPlan != null ? `La durée de votre réservation vous a permis de bénéficier d\'une réduction de ${reservation.appliedPlan.reduction}%` : ''}<br>
                          <b>Prix total :</b> ${reservation.totalAmount}€<br><br>
                          <b>Vous pourrez retrouver votre facture dans votre espace personnel sur notre application ou notre site web.</b>
                        </p>
                        <div style="padding: 24px"></div>
                      </div>
                    
                      <div style="background-color: #e9ecef; margin: auto; display: block; max-width: 600px; padding: 24px;
                            font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; border-top: 3px solid #d4dadf; text-align: center">
                        <p class="footer-text">
                          Vous avez reçu cet email suite à la validation d'une commande sur notre site ou notre application.
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
