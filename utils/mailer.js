import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config(); 

// Configuration du transporteur SMTP pour Gmail
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false, 
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
            from: process.env.SMTP_USER, 
            to, 
            subject,
            text
        };

        await transporter.sendMail(mailOptions);
        console.log("📧 Email envoyé avec succès !");
    } catch (error) {
        console.error("❌ Erreur lors de l'envoi de l'email :", error);
    }
};



