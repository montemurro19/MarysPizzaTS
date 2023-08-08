import nodemailer from 'nodemailer';
import config from '../Config/config';
import logs from '../Middlewares/logs';

async function sendEmail(to: string, subject: string, text: string) {
    const transporter = nodemailer.createTransport(config.email);

    const mailOptions = {
        from: 'marys.pizza@health.check.com',
        to,
        subject,
        text
    };

    try {
        await transporter.sendMail(mailOptions);
        logs.info('email', `email enviado para ${to}`);
    } catch (e) {
        logs.error('email', 'email não enviado');
    }
}

export default sendEmail;
