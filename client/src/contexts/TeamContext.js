import axios from 'axios'
import { createContext, useReducer, useState } from 'react'
import teamReducer from '../reducers/teamReducer'
import {
	ADD_TEAM,
	apiUrl,
	TEAMS_LOADED_FAIL,
	TEAMS_LOADED_SUCCESS,
	FIND_TEAM,
	DELETE_TEAM,
	UPDATE_TEAM,
} from './contants'

const TeamContext = createContext()

const TeamContextProvider = ({ children }) => {
	const [teamState, dispatch] = useReducer(teamReducer, {
		team: {},
		teams: [],
		teamsLoading: true,
	})

	const [showAddTeamModal, setShowAddTeamModal] = useState(false)
	const [showUpdateTeamModal, setShowUpdateTeamModal] = useState(false)
	// Get all teams
	const getTeams = async () => {
		try {
			const response = await axios.get(`${apiUrl}/teams`)
			if (response.data.success) {
				dispatch({
					type: TEAMS_LOADED_SUCCESS,
					payload: response.data.teams,
				})
			}
		} catch (error) {
			dispatch({ type: TEAMS_LOADED_FAIL })
		}
	}

	// Get teams of tournament
	const getTeamsOfTournamentId = async (tournamentId) => {
		try {
			const response = await axios.get(`${apiUrl}/teams/${tournamentId}`)
			if (response.data.success) {
				dispatch({
					type: TEAMS_LOADED_SUCCESS,
					payload: response.data.teams,
				})
			}
		} catch (error) {
			dispatch({ type: TEAMS_LOADED_FAIL })
		}
	}

	// Add Team
	const addTeam = async (tournamentId, newTeam) => {
		newTeam = { ...newTeam, tournamentId }
		try {
			const response = await axios.post(`${apiUrl}/teams`, newTeam)
			if (response.data.success) {
				dispatch({ type: ADD_TEAM, payload: response.data.team })
				return response.data
			}
		} catch (error) {
			return error.response.data
				? error.response.data
				: { success: false, message: 'Server error' }
		}
	}

	// Delete Team
	const deleteTeam = async (teamId) => {
		try {
			const response = await axios.delete(`${apiUrl}/teams/${teamId}`)
			if (response.data.success) {
				dispatch({
					type: DELETE_TEAM,
					payload: teamId,
				})
			}
		} catch (error) {
			console.log(error)
		}
	}

	// Find team when user updating team
	const findTeam = (teamId) => {
		const team = teamState.teams.find((t) => t._id === teamId)
		dispatch({ type: FIND_TEAM, payload: team })
	}

	// Update the tournament
	const updateTeam = async (updatedTeam) => {
		try {
			const response = await axios.put(
				`${apiUrl}/teams/${updatedTeam._id}`,
				updatedTeam
			)
			if (response.data.success) {
				dispatch({
					type: UPDATE_TEAM,
					payload: response.data.team,
				})
			}
			return response.data
		} catch (error) {
			return error.response.data
				? error.response.data
				: { success: false, message: 'Server error' }
		}
	}

	// Team context data
	const teamContextData = {
		getTeams,
		teamState,
		addTeam,
		deleteTeam,
		showAddTeamModal,
		setShowAddTeamModal,
		showUpdateTeamModal,
		setShowUpdateTeamModal,
		getTeamsOfTournamentId,
		findTeam,
		updateTeam,
	}

	return (
		<TeamContext.Provider value={teamContextData}>
			{children}
		</TeamContext.Provider>
	)
}

export { TeamContext }
export default TeamContextProvider
