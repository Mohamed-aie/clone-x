const jwt = require('jsonwebtoken');
const createError = require("./error");
const env = require('../config/env');
const transporter = require('../utils/mailer');

const nodemailer = require('nodemailer');

const sendWelcomeEmail = async (email, username) => {
    // 1. Configuration du transporteur (Sandbox)
    const transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: Number(process.env.MAIL_PORT),
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS
        }
    });
    // 2. Options de l'email
    const mailOptions = {
        from: '"Clone X" <no-reply@clonex.com>',
        to: email,
        subject: "Bienvenue sur Clone X ! 🚀",
        html: `
            <div style="font-family: sans-serif;">
                <h1>Salut ${username} !</h1>
                <p>Ton compte a été créé avec succès sur <strong>Clone X</strong>.</p>
                <p>On a hâte de voir tes premiers posts !</p>
            </div>
        `
    };

    // 3. Envoi effectif
    try {
        await transporter.sendMail(mailOptions);
        console.log(`✅ Email de bienvenue envoyé à : ${email}`);
    } catch (err) {
        console.error("❌ Erreur dans le service email :", err.message);
        // On ne bloque pas l'application si le mail échoue
    }
};

const verifyToken = (req,res,next) =>{
    // récup le json (token) jwt a partir des cookies 
    const token =req.cookies.access_token ;
    if(!token)return next (createError(401, "Acess Denied"));
    // vérfie le vailidité du token en utilisant jwt.verify 
    jwt.verify(token, env.TOKEN,(err,user) => {
        if (err)return next(createError(403,"Token non valide"));
        // Si la verif est réussie, on ajoute les inf de l'utilisateur dans l'objet "req.ath"
        req.auth = user
        next();
    })
}
module.exports = {
    verifyToken,
    sendWelcomeEmail,
}