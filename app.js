const express = require('express');
const connectDB = require('./config/db_mongo');
const ENV = require('./config/env');
const app = express();
const cookieParser = require('cookie-parser');


//MIDDLEWARES
app.use(cookieParser());
app.use(express.json());


// import des routes
const userRouter = require('./router/user.router');
const tweetRouter = require('./router/tweet.router');
const messageRouter = require('./router/message.router');


//CONNEXION MONGO
connectDB(ENV.MONGO_URI, ENV.DB_NAME);


// prefix
app.use('/api/user', userRouter);
app.use('/api/tweet', tweetRouter);
app.use('/api/message', messageRouter);



// MIDDLEWARES DE GESTION D'ERREURS
app.use((error, req, res, next) => {
    const status = error.status || 500;
    const message = error.message|| "une erreur est survenue";
    const detail = error.details|| null;

    res.status(status).json({
        error:{
            status,
            message,
            detail
        }

    })
});
module.exports = app;