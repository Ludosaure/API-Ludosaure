import {BadRequestException, Injectable} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import EmailService from "./email.service";
import {emailConfig} from "../../config/email.config";
import {urlConfig} from "../../config/url.config";
import {jwtConfig} from "../../config/jwt.config";

@Injectable()
export class EmailAccountConfirmationService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly emailService: EmailService,
    ) {}

    public sendVerificationLink(email: string) {
        const token = this.jwtService.sign({ email: email });

        const confirmationAccountUrl = `${urlConfig.emailConfirmationAccountUrl}?token=${token}`;
        const unsubscribeUrl = `${urlConfig.unsubscribeUrl}?token=${token}`;

        return this.emailService.sendMail({
            from: emailConfig.emailUser,
            to: email,
            subject: 'La Ludosaure - Confirmation de compte',
            html: `<!DOCTYPE html>
                    <html lang="">
                    <head>
                    
                      <meta charset="utf-8">
                      <title>Confirmation de compte</title>
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
                              line-height: 24px;
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
                          Confirmez votre inscription
                        </h1>
                        <p class="text">
                          Bienvenue chez la Ludosaure !<br>
                          Pour terminer votre inscription, veuillez cliquer sur le bouton ci-dessous afin de confirmer la création de votre
                          compte.
                        </p>
                        <div style="width: 100%; text-align: center;">
                          <button style="background-color: #1a82e2; border-radius: 6px; border: 0; margin: 24px">
                            <a href="${confirmationAccountUrl}" target="_blank"
                               style="display: inline-block; padding: 16px 36px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; color: #ffffff; text-decoration: none;">
                              Confirmer mon compte</a>
                          </button>
                        </div>
                        <p class="text">
                          Si cela ne fonctionne pas, copiez et collez le lien suivant dans votre
                          navigateur : <br>
                          <a href="${confirmationAccountUrl}" target="_blank">${confirmationAccountUrl}</a></p>
                        <div style="padding: 24px"></div>
                      </div>
                    
                      <div style="background-color: #e9ecef; margin: auto; display: block; max-width: 600px; padding: 24px;
                            font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; border-top: 3px solid #d4dadf; text-align: center">
                        <p class="footer-text">
                          Vous avez reçu cet email suite à une requête de création de compte sur notre site ou notre application.
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

    public async decodeConfirmationToken(token: string) {
        try {
            const payload = await this.jwtService.verify(token, {
                secret: jwtConfig.jwtAccessSecret,
            });

            if (typeof payload === 'object' && 'email' in payload) {
                return payload.email;
            }
            throw new BadRequestException();
        } catch (error) {
            if (error?.name === 'TokenExpiredError') {
                throw new BadRequestException('Email confirmation token expired');
            }
            throw new BadRequestException('Bad confirmation token');
        }
    }
}
