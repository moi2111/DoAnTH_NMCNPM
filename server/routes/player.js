const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/auth')

const Player = require('../models/Player')
const Team = require('../models/Team')

// @route GET api/players/:id
// @desc Get player
// @access Public
router.get('/:id', async (req, res) => {
	try {
		const player = await Player.find({ _id: req.params.id }).populate(
			'user',
			['username']
		)
		res.json({
			success: true,
			player,
		})
	} catch (error) {
		console.log(error)
		res.status(500).json({
			success: false,
			message: 'Internal server error',
		})
	}
})

// @route GET api/players
// @desc Get players
// @access Public
router.get('/', async (req, res) => {
	try {
		const players = await Player.find().populate('user', ['username'])
		res.json({
			success: true,
			players,
		})
	} catch (error) {
		console.log(error)
		res.status(500).json({
			success: false,
			message: 'Internal server error',
		})
	}
})

// @route POST api/players
// @desc Create player
// @access Private
router.post('/', verifyToken, async (req, res) => {
	const {
		name,
		age,
		position,
		number,
		avatar,
		height,
		weight,
		scored,
		teamName,
	} = req.body

	const team = await Team.findOne({ name: teamName })

	// simple validation
	if (!name) {
		return res
			.status(400)
			.json({ success: false, message: 'Name is required' })
	}
	if (!position) {
		return res.status(400).json({
			success: false,
			message: 'Please choose a position for the player',
		})
	}
	if (!team) {
		return res
			.status(400)
			.json({ success: false, message: 'Team not found' })
	}

	try {
		const newPlayer = new Player({
			name,
			age,
			position,
			number,
			avatar,
			height,
			weight,
			scored,
			teamName,
			user: req.userId,
		})
		await newPlayer.save()

		res.json({
			success: true,
			message: 'Cool, you have added 1 player',
			player: newPlayer,
		})
	} catch (error) {
		console.log(error)
		res.status(500).json({
			success: false,
			message: 'Internal server error',
		})
	}
})

// @route PUT api/players
// @desc Update player
// @access Private
router.put('/:id', verifyToken, async (req, res) => {
	const {
		name,
		age,
		position,
		number,
		avatar,
		height,
		weight,
		scored,
		teamName,
	} = req.body

	const team = await Team.findOne({ name: teamName })

	// simple validation
	if (!name) {
		return res
			.status(400)
			.json({ success: false, message: 'Name is required' })
	}
	if (!position) {
		return res.status(400).json({
			success: false,
			message: 'Please choose a position for the player',
		})
	}
	if (!team) {
		return res
			.status(400)
			.json({ success: false, message: 'Team not found' })
	}

	try {
		let updatedPlayer = {
			name,
			age,
			position,
			number,
			avatar,
			height,
			weight,
			scored,
			teamName,
		}

		const playerUpdateCondition = { _id: req.params.id, user: req.userId }
		updatedPlayer = await Player.findOneAndUpdate(
			playerUpdateCondition,
			updatedPlayer,
			{ new: true }
		)

		// User not authorized to update player or player not found
		if (!updatedPlayer) {
			return res.status(401).json({
				success: false,
				message: 'Player not found or user not authorized',
			})
		}

		res.json({
			success: true,
			message: 'Excellent progress!',
			player: updatedPlayer,
		})
	} catch (error) {
		console.log(error)
		res.status(500).json({
			success: false,
			message: 'Internal server error',
		})
	}
})

// @route DELETE api/players
// @desc Delete player
// @access Private
router.delete('/:id', verifyToken, async (req, res) => {
	try {
		const playerDeleteCondition = { _id: req.params.id, user: req.userId }
		const deletedPlayer = await Player.findOneAndDelete(
			playerDeleteCondition
		)

		// User not authorized to delete player or player not found
		if (!deletedPlayer) {
			return res.status(401).json({
				success: false,
				message: 'Player not found or user not authorized',
			})
		}

		res.json({
			success: true,
			message: 'Excellent progress!',
			player: deletedPlayer,
		})
	} catch (error) {
		console.log(error)
		res.status(500).json({
			success: false,
			message: 'Internal server error',
		})
	}
})

module.exports = router
