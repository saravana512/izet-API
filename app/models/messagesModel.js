const mongoose = require('mongoose');

const messageModel = new mongoose.Schema(
	{
		senderId: {
			type: String,
			ref: 'users',
			required: true
		},
		receiverId: {
			type: String,
			ref: 'users',
			required: true
		},
		messageContent: {
			type: String,
			required: true
		},
		messageType: {
			type: String,
			enum: ['sent', 'received'],
			required: true
		},
		createdDate: {
			type: Date,
			default: Date.now
		},
		isRead: {
			type: Boolean,
			default: false
		}
	},
	{
		versionKey: false
	}
);

module.exports = mongoose.model('messages', messageModel);
