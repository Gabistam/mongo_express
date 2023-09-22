const mongoose = require('mongoose');
const { Schema } = mongoose;
const passportLocalMongoose = require('passport-local-mongoose');

// Création du schéma de données
const UserSchema = new Schema({
    username: {
        String,
        required: true,
    minlength: [3, 'Le username doit comporter au moins 3 lettres'],
    maxlength: [30, 'Le username ne doit pas dépasser 30 lettres']
    },
    email: {
        String, 
        required: true, 
        unique: true,
        match: [
            /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
            'L\'email n\'est pas valide'
        ] // regex pour valider le format de l'email
    },
    password: {
        String, 
        required: true,
        minlength: [8, 'Le mot de passe doit comporter au moins 8 caractères']
    },
    role: {
        String,
        enum: {
            values: ['admin', 'user'],
            message: 'Le role est invalide.'
        },
        default: 'user'
        },
    createdAt: Date,
    updatedAt: Date,
});

//initialisation du plugin passport-local-mongoose qui va nous permettre de gérer l'authentification
UserSchema.plugin(passportLocalMongoose);

// Création du modèle User à partir du schéma UserSchema
const User = mongoose.model('User', UserSchema);

//Exportation du modèle User vers les autres fichiers
module.exports = User;