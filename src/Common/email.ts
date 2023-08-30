import nodemailer from 'nodemailer';
import config from './config';

export default class Email {
    static async send(to: string, subject: string, text: string) {
        const transporter = nodemailer.createTransport(config.email);

        const mailOptions = {
            from: 'marys.pizza@health.check.com',
            to,
            subject,
            text
        };

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.log(err);
            }
            console.log(info.response);
            transporter.close();
        });
    }
}
