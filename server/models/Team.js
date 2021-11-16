const mongoose = require('mongoose')
const Schema = mongoose.Schema

// câu lạc bộ
const TeamSchema = new Schema({
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
