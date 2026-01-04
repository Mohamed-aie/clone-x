const mongoose = require('mongoose');

const messageSchema = mongoose.Schema(
    {
        content: {
            type: String,
            required: true
        },
        user : {
            type: mongoose.Schema.Types.ObjectId, 
            ref: "Users",
        },
        picture:{
            img: {type: String},
            img1:{type: String},
            img2:{type: String},
            img3:{type: String},
            img4:{type: String},
        },
        media: {
        type: String, // On stocke l'URL de l'image ou de la vidéo
        default: null
        },
    }, { timestamps: { createdAt: true } }
)

module.exports = mongoose.model('Message', messageSchema);