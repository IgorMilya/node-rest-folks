import nodemailer from 'nodemailer';
import { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD } from '../config/config.js';

const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: true, // true for 465, false for other ports
    auth: {
        user: SMTP_USER,
        pass: SMTP_PASSWORD,
    },
});

export const sendEmail = async userEmail => {
    await transporter.sendMail({
        from: SMTP_USER,
        to: userEmail,
        subject: 'Your bills from coca ✔',
        text: '',
        html: '<b>Hello dear Customer</b>',
    });
};
