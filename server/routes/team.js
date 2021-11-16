const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/auth')

const Team = require('../models/Team')

// @route GET api/teams
// @desc Get teams
// @access Public
router.get('/', async (req, res) => {
	try {
		const teams = await Team.find().populate('user', ['username'])
		res.json({
			success: true,
			teams,
		})
	} catch (error) {
		console.log(error)
		res.status(500).json({
			success: false,
			message: 'Internal server error',
		})
	}
})

// @route POST api/teams
// @desc Create team
// @access Private
router.post('/', verifyToken, async (req, res) => {
	const { name, logo, trainer } = req.body

	// simple validation
	if (!name) {
		return res
			.status(400)
			.json({ success: false, message: 'Name is required' })
	}

	try {
		const team = await Team.findOne({ name })
		if (team) {
			return res
				.status(400)
				.json({ success: false, message: 'Name already exists' })
		}
		const newTeam = new Team({
			name,
			logo,
			trainer,
			user: req.userId,
		})
		await newTeam.save()

		res.json({
			success: true,
			message: 'Great, you made a team!',
			team: newTeam,
		})
	} catch (error) {
		console.log(error)
		res.status(500).json({
			success: false,
			message: 'Internal server error',
		})
	}
})

// @route PUT api/teams
// @desc Update team
// @access Private
router.put('/:id', verifyToken, async (req, res) => {
	const { name, logo, trainer } = req.body

	// simple validation
	if (!name) {
		return res
			.status(400)
			.json({ success: false, message: 'Name is required' })
	}

	try {
		let updatedTeam = {
			name,
			logo: logo || '',
			trainer: trainer || '',
		}

		const teamUpdateCondition = { _id: req.params.id, user: req.userId }
		updatedTeam = await Team.findOneAndUpdate(
			teamUpdateCondition,
			updatedTeam,
			{ new: true }
		)

		// User not authorized to update team or team not found
		if (!updatedTeam) {
			return res.status(401).json({
				success: false,
				message: 'Team not found or user not authorized',
			})
		}

		res.json({
			success: true,
			message: 'Excellent progress!',
			team: updatedTeam,
		})
	} catch (error) {
		console.log(error)
		res.status(500).json({
			success: false,
			message: 'Internal server error',
		})
	}
})

// @route DELETE api/teams
// @desc Delete team
// @access Private
router.delete('/:id', verifyToken, async (req, res) => {
	try {
		const teamDeleteCondition = { _id: req.params.id, user: req.userId }
		const deletedTeam = await Team.findOneAndDelete(teamDeleteCondition)

		// User not authorized to delete team or team not found
		if (!deletedTeam) {
			return res.status(401).json({
				success: false,
				message: 'Team not found or user not authorized',
			})
		}

		res.json({
			success: true,
			message: 'Excellent progress!',
			team: deletedTeam,
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
