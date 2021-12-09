const mongoose = require('mongoose')
const Schema = mongoose.Schema

// đội bóng
const TeamSchema = new Schema({
	tournament: {
		type: Schema.Types.ObjectId,
		ref: 'tournaments',
		required: true,
	},
	name: {
		type: String,
		required: true,
		unique: true,
	},
	logo: {
		type: String,
	},
	// Huấn luyện viên
	trainer: {
		type: String,
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: 'users',
	},
})

module.exports = mongoose.model('teams', TeamSchema)
