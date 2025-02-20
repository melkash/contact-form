import nodemailer from "nodemailer";
/*import fetch from "node-fetch";*/
import dotenv from "dotenv";

dotenv.config(); // Charger les variables d'environnement

// Configuration du transporteur SMTP pour Outlook
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false, // true pour port 465 (SSL), false pour 587 (STARTTLS)
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    },
    tls: {
        ciphers: "SSLv3"
    }
});



// Fonction pour envoyer un email
export const sendEmail = async (to, subject, text) => {
    try {

        await transporter.verify();
        console.log("✅ SMTP prêt, envoi de l'email en cours...");

        const mailOptions = {
            from: process.env.SMTP_USER, // L'expéditeur (ton email Outlook)
            to, // Destinataire (email où tu veux recevoir les messages)
            subject,
            text
        };

        await transporter.sendMail(mailOptions);
        console.log("📧 Email envoyé avec succès !");
    } catch (error) {
        console.error("❌ Erreur lors de l'envoi de l'email :", error);
    }
};

/*import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config(); // Charger les variables d'environnement

export const sendEmail = async (to, subject, text) => {
    try {
        const response = await fetch("https://api.brevo.com/v3/smtp/email", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "api-key": process.env.SMTP_PASS
            },
            body: JSON.stringify({
                sender: { email: "abou_tal_ha@hotmail.com" }, // Remplace par ton email validé
                to: [{ email: to }],
                subject: subject,
                textContent: text
            })
        });

        const data = await response.json();

        if (!response.ok) {
            console.error("❌ Erreur lors de l'envoi de l'email :", data);
        } else {
            console.log("📧 Email envoyé avec succès !", data);
        }
    } catch (error) {
        console.error("❌ Erreur lors de l'envoi de l'email :", error);
    }
};*/

