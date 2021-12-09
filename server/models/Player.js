const mongoose = require('mongoose')
const Schema = mongoose.Schema

// cầu thủ
const PlayerSchema = new Schema({
	tournamentId: { type: String, required: true },
	teamId: { type: String, required: true },
	name: { type: String, required: true },
	age: { type: Number, min: 18, index: true },
	// vị trí
	position: {
		type: String,
		enum: ['Thủ môn', 'Hậu vệ', 'Tiền vệ', 'Tiền đạo'],
	},
	number: { type: Number }, // số áo
	avatar: { type: String }, // ảnh cá nhân
	height: { type: Number }, // chiều cao
	weight: { type: Number }, // cân nặng
	scored: { type: Number }, // số ghi bàn
	user: {
		type: Schema.Types.ObjectId,
		ref: 'users',
	},
})

module.exports = mongoose.model('players', PlayerSchema)
