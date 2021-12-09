import { createContext, useReducer, useState } from 'react'
import { tournamentReducer } from '../reducers/tournamentReducer'
import {
	apiUrl,
	TOURNAMENTS_LOADED_SUCCESS,
	TOURNAMENTS_LOADED_FAIL,
	ADD_TOURNAMENT,
	DELETE_TOURNAMENT,
	UPDATE_TOURNAMENT,
	FIND_TOURNAMENT,
} from './contants'
import axios from 'axios'

const TournamentContext = createContext()

const TournamentContextProvider = ({ children }) => {
	// State
	const [tournamentState, dispatch] = useReducer(tournamentReducer, {
		tournament: {},
		tournaments: [],
		tournamentsLoading: true,
	})
	const [showAddTournamentModal, setShowAddTournamentModal] = useState(false)
	const [showUpdateTournamentModal, setShowUpdateTournamentModal] =
		useState(false)
	const [showToast, setShowToast] = useState({
		show: false,
		message: '',
		type: null,
	})

	// Get all tournaments
	const getTournaments = async () => {
		try {
			const response = await axios.get(`${apiUrl}/tournaments`)
			if (response.data.success) {
				dispatch({
					type: TOURNAMENTS_LOADED_SUCCESS,
					payload: response.data.tournaments,
				})
			}
		} catch (error) {
			dispatch({ type: TOURNAMENTS_LOADED_FAIL })
		}
	}

	// Add tournament
	const addTournament = async (newTournament) => {
		try {
			const response = await axios.post(
				`${apiUrl}/tournaments`,
				newTournament
			)
			if (response.data.success) {
				dispatch({
					type: ADD_TOURNAMENT,
					payload: response.data.tournament,
				})
				return response.data
			}
		} catch (error) {
			return error.response.data
				? error.response.data
				: { success: false, message: 'Server error' }
		}
	}

	// Delete tournament
	const deleteTournament = async (tournamentId) => {
		try {
			const response = await axios.delete(
				`${apiUrl}/tournaments/${tournamentId}`
			)
			if (response.data.success) {
				dispatch({
					type: DELETE_TOURNAMENT,
					payload: tournamentId,
				})
			}
		} catch (error) {
			console.log(error)
		}
	}

	// Find tournament when user updating tournament
	const findTournament = (tournamentId) => {
		const tournament = tournamentState.tournaments.find(
			(t) => t._id === tournamentId
		)
		dispatch({ type: FIND_TOURNAMENT, payload: tournament })
	}

	// Update the tournament
	const updateTournament = async (updatedTournament) => {
		try {
			const response = await axios.put(
				`${apiUrl}/tournaments/${updatedTournament._id}`,
				updatedTournament
			)
			if (response.data.success) {
				dispatch({
					type: UPDATE_TOURNAMENT,
					payload: response.data.tournament,
				})
			}
			return response.data
		} catch (error) {
			return error.response.data
				? error.response.data
				: { success: false, message: 'Server error' }
		}
	}

	// Tournament context data
	const tournamentContextData = {
		getTournaments,
		tournamentState,
		showAddTournamentModal,
		setShowAddTournamentModal,
		addTournament,
		showToast,
		setShowToast,
		deleteTournament,
		updateTournament,
		findTournament,
		showUpdateTournamentModal,
		setShowUpdateTournamentModal,
	}

	return (
		<TournamentContext.Provider value={tournamentContextData}>
			{children}
		</TournamentContext.Provider>
	)
}

export { TournamentContext }
export default TournamentContextProvider
