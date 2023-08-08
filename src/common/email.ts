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

        try {
            await transporter.sendMail(mailOptions);
            console.log('email enviado');
        } catch (err) {
            console.log('email não enviado');
        }
    }
}
