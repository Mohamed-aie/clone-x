const createError = require('../middleware/error');
const tweetModel = require('../models/tweet.model');
const userModel = require('../models/user.model');
const verifyToken = require('../middleware/auth');
const env = require('../config/env');


const getAll = async (req, res,next) => {
    try {
        const tweet =  await tweetModel.find();
        res.status(200).json(tweet);
    } catch (error) {
        next(createError(error.status || 500,error.message));
    }
}

const postTweet = async (req, res,next) => {
    try {
        const tweet = await tweetModel.create(req.body);
        res.status(201).json(tweet);
    } catch (error) {
        next(createError(error.status || 500,error.message))
    }
}

const deleteTweet = async (req, res,next) => {
    try {
        const tweet = await tweetModel.findByIdAndDelete(req.params.id);
        if(!tweet){
            return res.status(404).json('Tweet non trouvé');
        }
        res.status(200).json('Tweet supprimé');
    } catch (error) {
      next(createError(error.status || 500,error.message))  
    }
}
const updateTweet = async (req, res,next) => {
    try {
        const tweet = await tweetModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
        if(!tweet){
            return res.status(404).json('Tweet non trouvé');
        }
        res.status(200).json(tweet);

    } catch (error) {
        next(createError(error.status || 500,error.message))
    }
}

const getComment = async (req, res,next) => {
    try {
        const tweetComments = await tweetModel.findById(req.params.id).populate('comments');
        if(!tweetComments){
            return res.status(404).json('Aucun commentaire trouvé pour ce tweet');
        }
        res.status(200).json(tweetComments);
    } catch (error) {
       next(createError(error.status || 500,error.message)) 
    }
}
const ascTweet = async (req, res,next) => {
    try {
        const tweets = await tweetModel.find().sort("likes");
        res.status(200).json(tweets);
    } catch (error) {
        next(createError(error.status || 500,error.message))
    }
}
const reTweet = async (req, res) => {
    try {
        const { tweetId } = req.params; // L'ID du tweet à retweeter
        const userId = req.auth.id;    // L'ID de l'utilisateur connecté

        // 1. Vérifier si le tweet original existe
        const originalTweet = await Tweet.findById(tweetId);
        if (!originalTweet) {
            return res.status(404).json("Tweet original introuvable");
        }
        // 2. Créer le nouveau tweet (le retweet)
        const retweet = await Tweet.create({
            content: "", // Souvent vide, sauf si c'est un "Quote Tweet"
            author: userId,
            retweetOf: tweetId // On lie au tweet original
        });
        res.status(201).json(retweet);
    } catch (error) {
        next(createError(error.status || 500, error.message));
    }
}

module.exports = {
    getAll,
    postTweet,
    deleteTweet,
    updateTweet,
    getComment,
    ascTweet,
    reTweet
}