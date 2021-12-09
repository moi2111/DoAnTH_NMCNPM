import {
	ADD_TEAM,
	DELETE_TEAM,
	FIND_TEAM,
	TEAMS_LOADED_FAIL,
	TEAMS_LOADED_SUCCESS,
	UPDATE_TEAM,
} from '../contexts/contants'

export const teamReducer = (state, action) => {
	const { type, payload } = action
	switch (type) {
		case TEAMS_LOADED_SUCCESS:
			return {
				...state,
				teams: payload,
				teamsLoading: false,
			}
		case TEAMS_LOADED_FAIL:
			return {
				...state,
				teams: [],
				tournamentsLoading: false,
			}
		case ADD_TEAM:
			return {
				...state,
				teams: [...state.teams, payload],
			}
		case DELETE_TEAM:
			return {
				...state,
				teams: state.teams.filter((team) => team._id !== payload),
			}
		case FIND_TEAM:
			return {
				...state,
				team: payload,
			}
		case UPDATE_TEAM:
			const newTeams = state.teams.map((team) =>
				team._id === payload._id ? payload : team
			)
			return {
				...state,
				teams: newTeams,
			}
		default:
			return state
	}
}

export default teamReducer
