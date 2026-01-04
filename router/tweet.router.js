const express = require('express');
const router = express.Router();
const tweetController = require('../controllers/tweet.controller');
const {verifyToken} = require('../middleware/auth');

router.get('/all', verifyToken,tweetController.getAll);
router.post('/add', verifyToken,tweetController.postTweet);
router.delete('/delete/:id', verifyToken,tweetController.deleteTweet);
router.put('/update/:id', verifyToken,tweetController.updateTweet);
router.get('/get/comments', verifyToken,tweetController.getComment);
router.get('/popular', verifyToken,tweetController.ascTweet);
router.post('/retweet', verifyToken,tweetController.reTweet);

module.exports = router;