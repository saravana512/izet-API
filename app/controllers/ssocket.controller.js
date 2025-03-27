'use strict';

const Message = require('../models/messagesModel');

exports.saveMessages = async data => {
	try {
		// Save the message to the database
		const newMessage = new Message({
			senderId: data.from, // Sender's ID
			receiverId: data.to, // Receiver's ID
			messageContent: data.message,
			messageType: 'sent', // Mark as 'sent'
			isRead: false
		});
		await newMessage.save();

		// Emit the message to the receiver
	} catch (error) {
		console.error('Error saving message:', error);
	}
};

exports.getMessages = async senderId => {
	try {
		console.log('Fetching messages for:', senderId);

		// Query the database for messages where senderId or receiverId matches the user
		const messages = await Message.find({
			$or: [{ senderId: senderId }, { receiverId: senderId }]
		}).sort({ createdDate: 1 });

		console.log('Fetched messages:', messages);
		return messages; // Return the fetched messages
	} catch (error) {
		console.error('Error fetching messages:', error);
		throw error; // Re-throw the error for better error handling
	}
};
