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

export const sendEmail = async ({ dishes, email, totalPrice, orderNumber }) => {
    const dishesView = dishes.map(({ title, price, amount }) => `<li>${title} .....${price}$ quantity: ${amount} ....${price * amount}$ </li>`);
    await transporter.sendMail({
        from: SMTP_USER,
        to: email,
        subject: 'Your bills from coca ✔',
        text: '',
        html: `<span>Hello, dear Customer. There is your bill #${orderNumber}</span>
        <ul>${dishesView}</ul>
        <hr>
        <div style="text-align: right">TOTAL:  ${totalPrice}$</div>
        `,
    });
};

export const sendEmailRegistration = async ({ email, firstName, secondName, password }) => {
    await transporter.sendMail({
        from: SMTP_USER,
        to: email,
        subject: 'Your Registration from coca ✔',
        text: '',
        html: `<span>Hello, Dear ${firstName} ${secondName}. There is your registration success, your password: ${password}</span>
      
        `,
    });
};
