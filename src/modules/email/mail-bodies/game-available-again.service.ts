import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import EmailService from "../email.service";
import { emailConfig } from "../../../config/email.config";
import { Game } from "../../../domain/model/game.entity";
import { User } from "../../../domain/model/user.entity";
import { EmailFooter } from "./footer/email-footer";

@Injectable()
export class GameAvailableAgainService {
    constructor(
      private readonly jwtService: JwtService,
      private readonly emailService: EmailService,
    ) {}

    public sendInformationMail(game:Game, user: User): void {
        const token = this.jwtService.sign({ email: user.email });

        return this.emailService.sendMail({
            from: emailConfig.emailUser,
            to: user.email,
            subject: `La Ludosaure - Votre jeu favoris ${game.name} est de nouveau disponible`,
            html: `<!DOCTYPE html>
                    <html lang="">
                    <head>
                    
                      <meta charset="utf-8">
                      <title>La Ludosaure - Votre jeu favoris ${game.name} est de nouveau disponible</title>
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
                          Bonne nouvelle ! Votre jeu favoris ${game.name} est de nouveau disponible :D
                        </h1>
                        <p class="text">
                            Bonjour ${user.firstname} ${user.lastname},<br><br>
                            Nous avons le plaisir de vous informer que le jeu ${game.name} est de nouveau disponible à la location.<br>
                            N'hésitez pas à venir le réserver !<br><br>
                        <div style="padding: 24px"></div>
                      </div>
                      ${EmailFooter.getFooter(token, "à la nouvelle disponibilité d'un jeu dans vos favoris")}
                    </div>
                    </body>
                    </html>`,
        })
    }
}
