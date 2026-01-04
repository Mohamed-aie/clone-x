const mongoose = require('mongoose');

const tweetSchema = mongoose.Schema(
    {
        auteur:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        content:{
            type: String,
            required: true,
            trim: true, // Supprime les espaces inutiles au début et à la fin
            maxlength: [280, "Votre tweet est trop long (maximum 280 caractères)"]
        },
  
        like:{
            type: Number,
            required: true,
        },
        
        comments:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment',
        }],
        media: [{
            type: { 
                type: String, 
                enum: ['image', 'video'] // Force le choix entre ces deux mots 
            },
            url: { type: String, required: true }
        }],
        retweetOf: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Tweet', 
            default: null 
        }
    }, 
    {
        timestamps: {createdAt:true}
    }
);
module.exports = mongoose.model('Tweet', tweetSchema);