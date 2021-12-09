const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Giải đấu
const TournamentSchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true,
	},
	description: {
		type: String,
	},
	status: {
		type: String,
		enum: ['Initializing', 'Going on', 'Finished'],
		default: 'Initializing',
	},
	teamOrder: {
		type: [Schema.Types.ObjectId],
		ref: 'teams',
		default: [],
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: 'users',
	},
})

module.exports = mongoose.model('tournaments', TournamentSchema)
