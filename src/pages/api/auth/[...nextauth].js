import NextAuth from "next-auth";
import Email from "next-auth/providers/email";
import { createTransport } from "nodemailer";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "../../../mongo";

import { create_session } from "../../../hooks/session";

function text({ url, host }) {
  return `Conectarse a ${host}\n${url}\n\n`;
}

function html(params) {
  const { url, host, theme } = params;

  const escapedHost = host.replace(/\./g, "&#8203;.");

  // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
  const brandColor = "#FF9F24";
  // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
  const buttonText = theme.buttonText || "#fff";

  const color = {
    background: "#f9f9f9",
    text: "#444",
    mainBackground: "#fff",
    buttonBackground: "#FF9F24",
    buttonBorder: "#FF9F24",
    buttonText: "#000",
  };

  return `
    <body style="background: ${color.background};">
      <table width="100%" border="0" cellspacing="20" cellpadding="0"
        style="background: ${color.mainBackground}; max-width: 600px; margin: auto; border-radius: 10px;">
        <tr>
          <td align="center"
            style="padding: 10px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
            Conectarse a <strong>${escapedHost}</strong>
          </td>
        </tr>
        <tr>
          <td align="center" style="padding: 20px 0;">
            <table border="0" cellspacing="0" cellpadding="0">
              <tr>
                <td align="center" style="border-radius: 5px;" bgcolor="${color.buttonBackground}"><a href="${url}"
                    target="_blank"
                    style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: ${color.buttonText}; text-decoration: none; border-radius: 5px; padding: 10px 20px; border: 1px solid ${color.buttonBorder}; display: inline-block; font-weight: bold;">Iniciar sesión</a>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    `;
}

export default NextAuth({
  providers: [
    Email({
      server: {
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
      async sendVerificationRequest(params) {
        const { identifier, url, provider, theme } = params;
        const { host } = new URL(url);
        const transport = createTransport(provider.server);
        const result = await transport.sendMail({
          to: identifier,
          from: provider.from,
          subject: `Conectarse a ${host}`,
          text: text({ url, host }),
          html: html({ url, host, theme }),
        });
        const failed = result.rejected.concat(result.pending).filter(Boolean);
        if (failed.length) {
          throw new Error(`Email(s) (${failed.join(", ")}) could not be sent`);
        }
      },
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  pages: {
    verifyRequest: "/miperfil",
    error: "/",
    signIn: "/miperfil",
  },
});
