import { urlConfig } from "../../../../config/url.config";
import { AppUtils } from "../../../../shared/appUtils";

export class EmailFooter {
  public static getFooter(token: string, sendReason: string): string {
    return `<div style="background-color: #e9ecef; margin: auto; display: block; max-width: 600px; padding: 24px;
                  font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; border-top: 3px solid #d4dadf; text-align: center">
              <p class="footer-text">
                Vous avez reçu cet email suite ${sendReason}.
              </p>
              <p class="footer-text">
                Pour ne plus recevoir d'autres emails de notre part, vous pouvez
                <a href="${urlConfig.unsubscribeUrl}?token=${token}" target="_blank">vous désabonner</a> à tout moment.
              </p>
              <p class="footer-text">
              ${AppUtils.address}
              </p>
              <p class="footer-text"></p>
            </div>`;
  }
}
