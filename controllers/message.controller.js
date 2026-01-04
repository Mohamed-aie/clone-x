const express = require('express');
const router = express.Router();
const createError = require('../middleware/error');
const messageModel = require('../models/message.model');
const env = require('../config/env');


const sendMessage = async (req,res,next) => {
    try {
        const message = await messageModel.create(req.body);
        res.status(201).json(message);
    } catch (error) {
        next(createError(error.status || 500,error.message));
    }
}
const updateMessage = async (req,res,next) =>{
    try {
        const message = await messageModel.findByIdAndUpdate(req.params.id, req.body, {new:true});
        res.status(200).json(message);
    } catch (error) {
        next(createError(error.status || 500,error.message));
    }
}

const deleteMessage = async (req,res,next) =>{
    try {
        const message = await messageModel.findByIdAndDelete(req.params.id);
        if (!message) return next(createError(404, 'Message not found'));
        res.status(200).json('Message deleted');
    } catch (error) {
        next(createError(error.status || 500,error.message)); 
    }
}

module.exports = {
    sendMessage,
    updateMessage,
    deleteMessage,
};