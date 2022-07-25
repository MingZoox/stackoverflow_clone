import * as dotenv from "dotenv";

dotenv.config();

interface ENV {
    PORT: string | undefined;
    SERVER_URL: string | undefined;
    DB_URI: string | undefined;
    ALLOW_ORIGIN: string | undefined;
    ACCESS_TOKEN_SECRET: string | undefined;
    AZURE_CONNECTION_STRING: string | undefined;
    AZURE_ACCESS_KEY: string | undefined;
    AZURE_URL_AVATARS: string | undefined;
    SMTP_MAIL: string | undefined;
    SMTP_PASS: string | undefined;
}

const envConfig: ENV = {
    PORT: process.env.PORT,
    DB_URI: process.env.DB_URI,
    SERVER_URL: process.env.SERVER_URL,
    ALLOW_ORIGIN: process.env.ALLOW_ORIGIN,
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
    AZURE_CONNECTION_STRING: process.env.AZURE_CONNECTION_STRING,
    AZURE_ACCESS_KEY: process.env.AZURE_ACCESS_KEY,
    AZURE_URL_AVATARS: process.env.AZURE_URL_AVATARS,
    SMTP_MAIL: process.env.SMTP_MAIL,
    SMTP_PASS: process.env.SMTP_PASS,
};

export default envConfig;
