const mongoose = require('mongoose')
const Schema = mongoose.Schema

// cầu thủ
const PlayerSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	age: {
		type: Number,
		min: 18,
		index: true,
	},
	// vị trí
	position: {
		type: String,
		enum: ['Thủ môn', 'Hậu vệ', 'Tiền vệ', 'Tiền đạo'],
	},
	// số áo
	number: {
		type: Number,
	},
	// ảnh cá nhân
	avatar: {
		type: String,
	},
	// chiều cao
	height: {
		type: Number,
	},
	// cân nặng
	weight: {
		type: Number,
	},
	// số ghi bàn
	scored: {
		type: Number,
	},
	// tên đội bóng
	teamName: {
		type: String,
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: 'users',
	},
})

module.exports = mongoose.model('players', PlayerSchema)
