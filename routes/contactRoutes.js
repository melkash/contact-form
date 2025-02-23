import express from "express"
import Message from '../models/Messages.js'
import { sendEmail } from "../utils/mailer.js";

const router = express.Router()


router.get("/", (req, res) => {
    res.render("contact", { title: "Contactez-nous" })
});

router.post("/", async (req, res, next) => {
    try {
        let { name, email, subject, message } = req.body;

        name = name.trim();
        email = email.trim();
        subject = subject.trim();
        message = message.trim();

        
        // vérification des champs requis
         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
         if(!emailRegex.test(email)){
           req.flash("error", "Veuillez entrer un email valide")
            return res.redirect("/contact")
        }

          const newMessage = new Message({ name, email, subject, message });
          await newMessage.save();
  
          await sendEmail(
            "abou_tal_ha@hotmail.com", 
            `Nouveau message de ${name} - ${subject}`,
            `Vous avez reçu un message de ${name} (${email}) :\n\n${message}`
        );

        req.flash("success", "Votre message a bien été envoyé !")
        return res.redirect("/contact")
    }catch (error){
        console.error("Erreur lors de l'envoie du formulaire", error);
        return next(error);
    }
});

export default router