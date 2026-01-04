const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const env = require('../config/env');
const createError = require('../middleware/error');
const { sendWelcomeEmail } = require('../services/email.service');

//Ajout nouvel utilisateur 
const register = async (req,res)=>{
    try {
        //"10" est le tour de salage (cryptage pas trop conséquent)
        const HashPassword = await bcrypt.hash(req.body.password,10);
        const user = await userModel.create({
            ...req.body,
            password: HashPassword
        });
        
        // Envoi de l'email en arrière-plan
        sendWelcomeEmail(user.email, user.username);

        res.status(201).json({
            message: "Inscription réussie !",
            user: user
        });
    } catch (error) {
        next(createError(error.status || 500,error.message));
    }
}
const login = async (req,res) =>{
    try {
        //1- recherche d'un utlisateur dans la base de données
        const email = await userModel.findOne({email:req.body.email});
        //2- Si l'utilisateur n'est pas trouvé, erreur 404
        if(!email) return res.status(404).json('user not found');
        //3-compare le mot de passe fourni dans la requete dans la base de données
        const comparePassword = await bcrypt.compare(
            req.body.password,
            email.password
        )
        //4-Si le mot de passe est incorrect, erreur 400
        if (!comparePassword) return res.status(400).json('password incorrect');
        //  créer un JWT
        const token = jwt.sign(
            {id:email._id},
            // {payload: user} pour trasmettre toutes les données de l'utilisateur.
            env.TOKEN,
            {expiresIn: "24h"}
        );

        const {password,...others } = email._doc
        res.cookie(
            'access_token',
            token,
            {httpOnly: true}
        ).status(200)
        .json(others)
    } catch (error) {
       next(createError(error.status || 500,error.message));
    }
}



module.exports = {
    register,
    login
}