require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')

const authRouter = require('./routes/auth')
const teamRouter = require('./routes/team')
const playerRouter = require('./routes/player')

const connectDB = async () => {
	try {
		await mongoose.connect(
			`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@quan-ly-bong-da.4uebx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
		)

		console.log('MongoDB connected!')
	} catch (error) {
		console.log(error.message)
		process.exit(1)
	}
}

connectDB()

const app = express()
app.use(express.json())

app.use('/api/auth', authRouter)
app.use('/api/teams', teamRouter)
app.use('/api/players', playerRouter)

const PORT = 5000
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
