import nodemailer from "nodemailer";
import env from "../configs/env.config";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: env.SMTP_MAIL,
        pass: env.SMTP_PASS,
    },
});

const sendMailService = (to: string, subject: string, mailContentHtml: string): void => {
    const mailOptions = {
        from: env.SMTP_MAIL,
        to,
        subject,
        html: mailContentHtml,
    };

    transporter.sendMail(mailOptions, (error: any, info) => {
        if (error) {
            throw new Error(error);
        } else {
            console.log(`Email sent: ${info.response}`);
        }
    });
};

export default sendMailService;
