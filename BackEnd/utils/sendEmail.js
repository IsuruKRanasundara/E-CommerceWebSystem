const nodemailer = require('nodemailer');

// Create transporter
const createTransporter = () => {
    return nodemailer.createTransporter({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });
};

// Email templates
const getEmailTemplate = (template, data) => {
    switch (template) {
        case 'verification':
            return {
                subject: 'Verify Your Email Address',
                html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                        <h2>Welcome to Our Platform!</h2>
                        <p>Hello ${data.username},</p>
                        <p>Thank you for registering with us. Please click the button below to verify your email address:</p>
                        <a href="${data.verificationLink}" 
                           style="background-color: #ea580c; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 20px 0;">
                            Verify Email
                        </a>
                        <p>If the button doesn't work, you can also copy and paste the following link into your browser:</p>
                        <p>${data.verificationLink}</p>
                        <p>This link will expire in 24 hours.</p>
                        <p>If you didn't create an account, please ignore this email.</p>
                        <p>Best regards,<br>Your Team</p>
                    </div>
                `
            };
        case 'passwordReset':
            return {
                subject: 'Reset Your Password',
                html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                        <h2>Password Reset Request</h2>
                        <p>Hello ${data.username},</p>
                        <p>We received a request to reset your password. Click the button below to set a new password:</p>
                        <a href="${data.resetLink}" 
                           style="background-color: #ea580c; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 20px 0;">
                            Reset Password
                        </a>
                        <p>If the button doesn't work, you can also copy and paste the following link into your browser:</p>
                        <p>${data.resetLink}</p>
                        <p>This link will expire in 10 minutes.</p>
                        <p>If you didn't request a password reset, please ignore this email.</p>
                        <p>Best regards,<br>Your Team</p>
                    </div>
                `
            };
        default:
            throw new Error('Invalid email template');
    }
};

// Send email function
const sendEmail = async ({ to, subject, template, data }) => {
    try {
        const transporter = createTransporter();
        const emailTemplate = getEmailTemplate(template, data);

        const mailOptions = {
            from: `"${process.env.FROM_NAME}" <${process.env.FROM_EMAIL}>`,
            to,
            subject: subject || emailTemplate.subject,
            html: emailTemplate.html,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.messageId);
        return info;
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
};

module.exports = { sendEmail };