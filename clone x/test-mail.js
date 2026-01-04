// Charge les variables d'environnement
require('dotenv').config(); 
// Si tu passes par ton fichier config/env.js, fais plutôt : 
require('./config/env');

const { sendWelcomeEmail } = require('./services/email.service');

console.log("🚀 Tentative d'envoi d'email de test...");

// On appelle la fonction manuellement
// Remplace 'ton-email@test.com' par une vraie adresse ou celle de Mailtrap/Ethereal
sendWelcomeEmail('josh.stanton95@ethereal.email', 'TesteurLazy')
    .then(() => {
        console.log("Le test est terminé ! Vérifie ta boîte de réception.");
    })
    .catch((err) => {
        console.error("Le test a échoué.");
        console.error(err);
    });