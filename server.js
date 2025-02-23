import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import contactRoutes from "./routes/contactRoutes.js";
import { create } from 'express-handlebars';
import session from 'express-session';
import flash from 'connect-flash' 
import MongoStore from 'connect-mongo';


dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

//Configuration de Handlebars
const hbs = create({ 
    extname: '.hbs',
    defaultLayout: 'main',
    layoutsDir: 'views/layouts',
    partialsDir: 'views/partials',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true, 
        allowProtoMethodsByDefault: false, 
     }     
    });

hbs.handlebars.registerHelper('eq', (a, b) => a === b);
hbs.handlebars.registerPartial('header', 'views/partials/header.hbs');
hbs.handlebars.registerPartial('footer', 'views/partials/footer.hbs');

app.engine('.hbs', hbs.engine)
app.set('view engine', '.hbs')

// Middleware de session (Avant Passport)
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI, // URL de connexion MongoDB
    }),
    cookie: {
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24, 
    },

    rolling : true
}));

// Middleware pour les messages flash
app.use(flash())
app.use((req, res, next) => {
    res.locals.messages = {
      success: req.flash('success'),
      error: req.flash('error')
    };
    console.log("📢 Messages flash transmis aux vues :", res.locals.messages); 
    next();
  });
  

// Middleware pour passer les requetes 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Défintion de la route d'accueil
app.get("/", (req, res) => {
    res.render("index", { title: "Accueil - Boutique Artisanale" });
});

// Importer les routes
app.use("/contact", contactRoutes)


// lancement du serveur
app.listen(PORT, () => {
    console.log(`Serveur en cours d'éxecution sur le port ${PORT}`)
});

//  connexion à MongoDB 
const MONGO_URI = process.env.MONGO_URI; 

mongoose.connect(MONGO_URI)
.then(() => console.log("Connecté à MongoDB avec succès !"))
.catch((err => console.error("Erreur de connexion à MongoDB", err)))

