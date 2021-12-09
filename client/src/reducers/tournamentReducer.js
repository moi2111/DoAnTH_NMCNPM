import {
	TOURNAMENTS_LOADED_SUCCESS,
	TOURNAMENTS_LOADED_FAIL,
	ADD_TOURNAMENT,
	DELETE_TOURNAMENT,
	UPDATE_TOURNAMENT,
	FIND_TOURNAMENT,
} from '../contexts/contants'

export const tournamentReducer = (state, action) => {
	const { type, payload } = action
	switch (type) {
		case TOURNAMENTS_LOADED_SUCCESS:
			return {
				...state,
				tournaments: payload,
				tournamentsLoading: false,
			}

		case TOURNAMENTS_LOADED_FAIL:
			return {
				...state,
				tournaments: [],
				tournamentsLoading: false,
			}
		case ADD_TOURNAMENT:
			return {
				...state,
				tournaments: [...state.tournaments, payload],
			}
		case DELETE_TOURNAMENT:
			return {
				...state,
				tournaments: state.tournaments.filter(
					(tournament) => tournament._id !== payload
				),
			}
		case FIND_TOURNAMENT:
			return {
				...state,
				tournament: payload,
			}
		case UPDATE_TOURNAMENT:
			const newTournaments = state.tournaments.map((tournament) =>
				tournament._id === payload._id ? payload : tournament
			)
			return {
				...state,
				tournaments: newTournaments,
			}
		default:
			return state
	}
}
