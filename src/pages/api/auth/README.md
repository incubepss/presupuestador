### Autentica sin contraseña

La identificación del usuario en base al correo electronico, la generación de sesion y la gestión de la cuenta están conformados por la libreria next-authjs. Siempre se está ejecutando en el cliente.

- Next-Auth js: https://next-auth.js.org/

Guias:
- Principal: https://next-auth.js.org/providers/email
- Alternativa con configuracion de mongodb: https://authjs.dev/getting-started/email-tutorial

#### Desarrollo:

- Instalar base Mongodb:

```
sudo docker run -p 27017:27017 --name mongo -d mongodb/mongodb-community-server:latest
```

- Configuración de ambiente:

```
// .env.local
SMTP_USER=""
SMTP_PASSWORD=""
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
EMAIL_FROM=""
MONGODB_URI="mongodb://localhost:27017"
```

```
// /api/auth/[...nextauth].js
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
            async sendVerificationRequest(params){
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
    adapter: PouchDBAdapter(pouchdb),
    pages: {
        verifyRequest: '/'
    }
})
```
