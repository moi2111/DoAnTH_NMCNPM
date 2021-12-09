const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/auth')

const Tournament = require('../models/Tournament')

// @route GET api/tournaments
// @desc Get tournaments
// @access Private
router.get('/', verifyToken, async (req, res) => {
	try {
		const tournaments = await Tournament.find()
			.populate('user', ['username'])
			.populate('teamOrder')
		res.json({
			success: true,
			tournaments,
		})
	} catch (error) {
		console.log(error)
		res.status(500).json({
			success: false,
			message: 'Internal server error',
		})
	}
})

// @route POST api/tournaments
// @desc Create tournament
// @access Private
router.post('/', verifyToken, async (req, res) => {
	const { name, description } = req.body

	// simple validation
	if (!name) {
		return res
			.status(400)
			.json({ success: false, message: 'Name is required' })
	}

	try {
		const tournament = await Tournament.findOne({ name })
		if (tournament) {
			return res.status(400).json({
				success: false,
				message: 'Name of tournament already exists',
			})
		}
		const newTournament = new Tournament({
			name,
			description,
			user: req.userId,
		})
		await newTournament.save()

		res.json({
			success: true,
			message: 'Great, you made a new tournament',
			tournament: newTournament,
		})
	} catch (error) {
		console.log(error)
		res.status(500).json({
			success: false,
			message: 'Internal server error',
		})
	}
})

// @route PUT api/tournaments
// @desc Update tournament
// @access Private
router.put('/:id', verifyToken, async (req, res) => {
	const { name, description, teamOrder, status } = req.body

	// simple validation
	if (!name) {
		return res
			.status(400)
			.json({ success: false, message: 'Name is required' })
	}

	try {
		let updatedTournament = {
			name,
			description: description || '',
			status,
			teamOrder,
			user: req.userId,
		}

		const tournamentUpdateCondition = {
			_id: req.params.id,
			user: req.userId,
		}
		updatedTournament = await Tournament.findOneAndUpdate(
			tournamentUpdateCondition,
			updatedTournament,
			{ new: true }
		)

		// User not authorized to update tournament or tournament not found
		if (!updatedTournament) {
			return res.status(401).json({
				success: false,
				message: 'Tournament not found or user not authorized',
			})
		}

		res.json({
			success: true,
			message: 'Excellent progress!',
			tournament: updatedTournament,
		})
	} catch (error) {
		console.log(error)
		res.status(500).json({
			success: false,
			message: 'Internal server error',
		})
	}
})

// @route DELETE api/tournaments
// @desc Delete tournament
// @access Private
router.delete('/:id', verifyToken, async (req, res) => {
	try {
		const tournamentDeleteCondition = {
			_id: req.params.id,
			user: req.userId,
		}
		const deletedTournament = await Tournament.findOneAndDelete(
			tournamentDeleteCondition
		)

		// User not authorized to update tournament or tournament not found
		if (!deletedTournament) {
			return res.status(401).json({
				success: false,
				message: 'Tournament not found or user not authorized',
			})
		}

		res.json({
			success: true,
			message: 'Excellent progress!',
			tournament: deletedTournament,
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
