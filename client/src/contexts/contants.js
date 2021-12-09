export const apiUrl =
	process.env.NODE_ENV !== 'production'
		? 'http://localhost:5000/api'
		: 'someDeployURL'

export const LOCAL_STORAGE_TOKEN_NAME = 'user-token-qldb'

export const TOURNAMENTS_LOADED_SUCCESS = 'TOURNAMENTS_LOADED_SUCCESS'
export const TOURNAMENTS_LOADED_FAIL = 'TOURNAMENTS_LOADED_FAIL'
export const ADD_TOURNAMENT = 'ADD_TOURNAMENT'
export const DELETE_TOURNAMENT = 'DELETE_TOURNAMENT'
export const UPDATE_TOURNAMENT = 'UPDATE_TOURNAMENT'
export const FIND_TOURNAMENT = 'FIND_TOURNAMENT'

export const TEAMS_LOADED_SUCCESS = 'TEAMS_LOADED_SUCCESS'
export const TEAMS_LOADED_FAIL = 'TEAMS_LOADED_FAIL'
export const ADD_TEAM = 'ADD_TEAM'
export const DELETE_TEAM = 'DELETE_TEAM'
export const UPDATE_TEAM = 'UPDATE_TEAM'
export const FIND_TEAM = 'FIND_TEAM'
