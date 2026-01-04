
const { MailtrapClient } = require("mailtrap");
const ENV = require("../config/env");

// Utilise le TOKEN API de Mailtrap (différent du mot de passe SMTP)
const TOKEN = "TON_API_TOKEN_MAILTRAP"; 
const client = new MailtrapClient({ token: TOKEN });

const sendWelcomeEmail = async (email, username) => {
  try {
    await client.send({
      from: { name: "Clone X", email: "hello@clonex.com" },
      to: [{ email: email }],
      subject: "Bienvenue !",
      text: `Salut ${username}, bienvenue sur Clone X !`,
      category: "Integration Test",
    });
    console.log(" Email envoyé via API (Port 443 - Inblocable) !");
  } catch (error) {
    console.error(" Erreur API :", error);
  }
};

module.exports = { sendWelcomeEmail };