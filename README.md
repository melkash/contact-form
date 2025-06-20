# 📬 Contact Form API

Une API Node.js/Express qui permet aux utilisateurs d’envoyer des messages via un formulaire de contact. Les messages sont enregistrés dans MongoDB et une notification par email est envoyée automatiquement via Nodemailer.

---

## 🚀 Fonctionnalités

- Formulaire de contact avec :
  - Nom
  - Email
  - Sujet
  - Message
- Validation côté serveur (email requis et formaté)
- Sauvegarde des messages dans une base MongoDB
- Envoi d’un email de notification via SMTP
- Affichage de messages flash pour informer l’utilisateur du succès ou de l’échec
- Frontend en Handlebars + Bootstrap

---

## 🛠️ Technologies utilisées

- Node.js
- Express
- MongoDB
- Mongoose
- Nodemailer
- dotenv
- express-session
- connect-mongo
- express-handlebars
- Bootstrap 5

---

## ⚙️ Installation

1. **Clone le dépôt :**
   ```bash
   git clone https://github.com/ton-utilisateur/contact-form.git
   cd contact-form
   ```

2. **Installe les dépendances :**
   ```bash
   npm install
   ```

3. **Configure le fichier `.env` :**
   Crée un fichier `.env` à la racine du projet et ajoute les variables suivantes :

   ```env
   PORT=3000
   MONGO_URI=your_mongodb_connection_string
   SESSION_SECRET=your_session_secret

   SMTP_HOST=smtp.example.com
   SMTP_PORT=587
   SMTP_USER=your_email@example.com
   SMTP_PASS=your_email_password
   ```

4. **Lance le serveur :**
   ```bash
   npm start
   ```

---

## 📂 Structure du projet

```
📁 models/
   └── Messages.js
📁 routes/
   └── contactRoutes.js
📁 utils/
   └── mailer.js
📁 views/
   ├── layouts/
   │   └── main.hbs
   ├── partials/
   │   └── footer.hbs
   ├── index.hbs
   └── contact.hbs
📄 server.js
📄 package.json
📄 .env
```

---

## 🧪 Exemple d'utilisation

Un utilisateur remplit le formulaire à l'adresse `/contact` :

**Requête POST :**
```
POST /contact
Content-Type: application/x-www-form-urlencoded

name=Ali Ibn Abi Talib
email=ali@example.com
subject=Demande d’information
message=Salam, j’aimerais en savoir plus sur vos produits.
```

**Réponse attendue :**
- Message enregistré en base de données
- Email envoyé à l’adresse définie dans le code
- Redirection avec un message de succès

---

## 💡 Améliorations possibles

- Ajouter Google reCAPTCHA pour filtrer les bots
- Permettre l'envoi d'une copie à l'utilisateur
- Ajouter une interface d’administration pour consulter les messages
- Validation plus poussée avec des bibliothèques comme `express-validator`
- Gestion des pièces jointes avec Nodemailer

---

## 📝 Licence

Projet libre à usage personnel ou professionnel. À adapter selon vos besoins.