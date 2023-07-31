import nodemailer from 'nodemailer'
import config from '../Config/config'

function sendEmail(to: string, subject: string, text: string) {
    const transporter = nodemailer.createTransport(config.email)

    const mailOptions = [
        from: 
    ]
}