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
                    <html xmlns="http://www.w3.org/1999/html">
                    <head>
                    
                      <meta charset="utf-8">
                      <meta http-equiv="x-ua-compatible" content="ie=edge">
                      <title>Confirmation de compte</title>
                      <meta name="viewport" content="width=device-width, initial-scale=1">
                      <style type="text/css">
                      /**
                       * Google webfonts. Recommended to include the .woff version for cross-client compatibility.
                       */
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
                      /**
                       * Avoid browser level font resizing.
                       * 1. Windows Mobile
                       * 2. iOS / OSX
                       */
                      body,
                      table,
                      td,
                      a {
                        -ms-text-size-adjust: 100%; /* 1 */
                        -webkit-text-size-adjust: 100%; /* 2 */
                      }
                      /**
                       * Remove extra space added to tables and cells in Outlook.
                       */
                      table,
                      td {
                        mso-table-rspace: 0pt;
                        mso-table-lspace: 0pt;
                      }
                      /**
                       * Better fluid images in Internet Explorer.
                       */
                      img {
                        -ms-interpolation-mode: bicubic;
                      }
                      /**
                       * Remove blue links for iOS devices.
                       */
                      a[x-apple-data-detectors] {
                        font-family: inherit !important;
                        font-size: inherit !important;
                        font-weight: inherit !important;
                        line-height: inherit !important;
                        color: inherit !important;
                        text-decoration: none !important;
                      }
                      /**
                       * Fix centering issues in Android 4.4.
                       */
                      div[style*="margin: 16px 0;"] {
                        margin: 0 !important;
                      }
                      body {
                        width: 100% !important;
                        height: 100% !important;
                        padding: 0 !important;
                        margin: 0 !important;
                      }
                      /**
                       * Collapse table borders to avoid space between cells.
                       */
                      table {
                        border-collapse: collapse !important;
                      }
                      a {
                        color: #1a82e2;
                      }
                      img {
                        height: auto;
                        line-height: 100%;
                        text-decoration: none;
                        border: 0;
                        outline: none;
                      }
                      </style>
                    
                    </head>
                    <body style="background-color: #e9ecef;">
                    
                      <!-- start body -->
                      <table border="0" cellpadding="0" cellspacing="0" width="100%">
                        <!-- start logo -->
                        <tr>
                          <td align="center" bgcolor="#e9ecef">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                              <tr>
                                <td align="center" valign="top" style="padding: 36px 24px;">
                                  <a href="//TODO rediriger vers site" target="_blank" style="display: inline-block;">
                                    <img src="https://kengo.bzh/media/image/aaf9a0e8-b90f-4727-8d5d-1b94ab6f7a6c_sticker-kengojpg.jpg" alt="Logo" border="0" width="150" style="display: block; width: 150px; max-width: 150px; min-width: 48px;">
                                  </a>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                        <!-- end logo -->
                    
                        <!-- start hero -->
                        <tr>
                          <td align="center" bgcolor="#e9ecef">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                              <tr>
                                <td align="left" bgcolor="#ffffff" style="padding: 36px 24px 0; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; border-top: 3px solid #d4dadf;">
                                  <h1 style="margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -1px; line-height: 48px;">
                                  Confirmation de ${isUpdate ? 'modification de ' : ''}commande
                                  </h1>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                        <!-- end hero -->
                    
                        <!-- start copy block -->
                        <tr>
                          <td align="center" bgcolor="#e9ecef">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                    
                              <!-- start copy -->
                              <tr>
                                <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                                    <h2>Merci ${reservation.user.firstname} pour ${isUpdate ? 'la modification de ' : ''}votre commande !</h2>
                                </td>
                              </tr>
                              <tr>
                                <td align="left" bgcolor="#ffffff" style="padding-left: 24px; padding-right: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                                    <h3>Voici le résumé de votre commande :</h3>
                                </td>
                              </tr>
                              <tr>
                                <td align="left" bgcolor="#ffffff" style="padding-left: 24px; padding-right: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                                    <u><b>Date de début :</b></u> ${reservation.startDate}. 
                                    Vous pourrez venir récupérer vos jeux directement à notre boutique le jour du début de votre commande : <b>2 bis Bd Cahours, 35150 Janzé</b></br>
                                </td>
                              </tr>
                              <tr>
                                <td align="left" bgcolor="#ffffff" style="padding-left: 24px; padding-right: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                                    <u><b>Date de fin :</b></u> ${reservation.endDate}</br>
                                </td>
                              </tr>
                              <tr>
                                <td align="left" bgcolor="#ffffff" style="padding-left: 24px; padding-right: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                                    <u><b>Jeux réservés :</b></u> ${reservation.games.map(game => game.name).join(', ')}</br>
                                </td>
                              </tr>
                              <tr>
                                <td align="left" bgcolor="#ffffff" style="padding-left: 24px; padding-right: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                                    ${reservation.appliedPlan != null ? `La durée de votre réservation vous a permis de bénéficier d\'une réduction de ${reservation.appliedPlan.reduction}%</br>` : ''}
                                </td>
                              </tr>
                              <tr>
                                <td align="left" bgcolor="#ffffff" style="padding-left: 24px; padding-right: 24px; padding-bottom: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                                    <u><b>Prix total :</b></u> ${reservation.totalAmount}€</br>
                                </td>
                              </tr>
                              <tr>
                                <td align="left" bgcolor="#ffffff" style="padding-left: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                                    Vous pourrez retrouver votre facture dans votre espace personnel sur notre application ou notre site web.
                                </td>
                              </tr>
                              <!-- end copy -->
                    
                            </table>
                          </td>
                        </tr>
                        <!-- end copy block -->
                    
                        <!-- start footer -->
                        <tr>
                          <td align="center" bgcolor="#e9ecef" style="padding: 24px;">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                    
                              <!-- start permission -->
                              <tr>
                                <td align="center" bgcolor="#e9ecef" style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;">
                                  <p style="margin: 0;">Vous avez reçu cet email suite à la validation d'une commande sur notre site ou notre application.</p>
                                </td>
                              </tr>
                              <!-- end permission -->
                    
                              <!-- start unsubscribe -->
                              <tr>
                                <td align="center" bgcolor="#e9ecef" style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;">
                                  <p style="margin: 0;">Pour ne plus recevoir d'autres emails de notre part, vous pouvez <a href="${unsubscribeUrl}" target="_blank">vous désabonner</a> à tout moment.</p>
                                  <p style="margin: 0;">2 BIS Boulevard Cahours, Janzé, France</p>
                                </td>
                              </tr>
                              <!-- end unsubscribe -->
                    
                            </table>
                          </td>
                        </tr>
                        <!-- end footer -->
                    
                      </table>
                      <!-- end body -->
                    
                    </body>
                    </html>`,
        })
    }
}
