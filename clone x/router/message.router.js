const express = require('express');
const router = express.Router();
const messageController = require('../controllers/message.controller');

router.post('/send', messageController.sendMessage);
router.put('/update/:id', messageController.updateMessage);
router.delete('/delete/:id', messageController.deleteMessage);

module.exports = router;