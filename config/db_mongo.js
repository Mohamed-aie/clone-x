const mongoose = require('mongoose');

const connectDB = (mongoURI, dbName) => {
    mongoose.connect(mongoURI,{dbName: dbName})
        .then (()=> console.log('connexion a mongo réussie'))
        .catch(error => console.log(`erreur de connexion a mongo: ${error}`));
}
module.exports = connectDB;