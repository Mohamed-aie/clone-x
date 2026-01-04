const nodemailer = require('nodemailer');
const ENV = require('../config/env')

const sendWelcomeEmail = async (email, username) => {
    // Configuration pour la Sandbox Mailtrap
    const transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS
        }
    });

    try {
        await transporter.sendMail({
            from: '"Clone X" <hello@demomailtrap.com>',
            to: email,
            subject: "Bienvenue sur Clone X ! 🚀",
            html: `<h1>Salut ${username} !</h1><p>Ton compte est prêt.</p>`,
        });
        console.log("✅ Email reçu par Mailtrap !");
    } catch (error) {
        console.error("❌ Erreur d'envoi :", error.message);
    }
};

module.exports = { sendWelcomeEmail };


