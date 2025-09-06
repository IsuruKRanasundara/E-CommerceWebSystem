// utils/sendEmail.js (or keep in the same controller file if preferred)
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === 'true', // true for 465, false for 587
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});

// Optional: verify transporter once at startup
transporter.verify().then(() => {
    console.log('SMTP connection ready');
}).catch(err => {
    console.error('SMTP config error:', err.message);
});

function renderTemplate(template, data = {}) {
    switch (template) {
        case 'verification':
            return `
        <p>Hi ${data.username || 'User'},</p>
        <p>Please verify your email by clicking the link below:</p>
        <p><a href="${data.verificationLink}">Verify Email</a></p>
        <p>If you did not create an account, ignore this email.</p>
      `;
        case 'passwordReset':
            return `
        <p>Hi ${data.username || 'User'},</p>
        <p>You requested a password reset. Click the link below to reset your password (valid for 10 minutes):</p>
        <p><a href="${data.resetLink}">Reset Password</a></p>
        <p>If you did not request this, you can ignore this email.</p>
      `;
        default:
            return `<p>${data.message || 'Hello'}</p>`;
    }
}

const sendEmail = async ({ to, subject, template, data }) => {
    if (!to) throw new Error('Missing "to"');
    if (!subject) throw new Error('Missing "subject"');

    const html = renderTemplate(template, data);
    const fromEmail = process.env.FROM_EMAIL || process.env.SMTP_USER;
    const fromName = process.env.FROM_NAME || 'No-Reply';
    const from = `${fromName} <${fromEmail}>`;

    try {
        const info = await transporter.sendMail({
            from,
            to,
            subject,
            html,
            text: html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
        });
        console.log('Email sent:', info.messageId);
        return info;
    } catch (err) {
        console.error('Email send failed:', err);
        throw err;
    }
};

module.exports = sendEmail;