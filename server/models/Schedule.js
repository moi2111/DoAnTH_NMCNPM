const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Lịch thi đấu
const ScheduleSchema = new Schema({
	tournaments: {
		type: String,
		required: true,
	},
	team1: {
		type: String,
	},
	team2: {
		type: String,
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: 'users',
	},
})

module.exports = mongoose.model('schedules', ScheduleSchema)
