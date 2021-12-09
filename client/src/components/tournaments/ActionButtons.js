import { Button } from 'react-bootstrap'
import addTeamIcon from '../../assets/person-plus.svg'
import editIcon from '../../assets/pencil.svg'
import deleteIcon from '../../assets/trash.svg'
import { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { TournamentContext } from '../../contexts/TournamentContext'
import { TeamContext } from '../../contexts/TeamContext'

const ActionButtons = ({ _id }) => {
	// Context
	const { deleteTournament, findTournament, setShowUpdateTournamentModal } =
		useContext(TournamentContext)

	const { setShowAddTeamModal } = useContext(TeamContext)

	// UseHistory
	const history = useHistory()

	const chooseTournament = (tournamentId) => {
		findTournament(tournamentId)
		setShowUpdateTournamentModal(true)
	}

	const addTeamToTournament = (tournamentId) => {
		findTournament(tournamentId)
		setShowAddTeamModal(true)
	}

	const showTeamsOfTournament = (tournamentId) => {
		findTournament(tournamentId)
		history.push('/teams')
	}

	return (
		<>
			<Button
				variant="dark"
				onClick={showTeamsOfTournament.bind(this, _id)}
			>
				List Teams
			</Button>
			<Button
				className="tournament-button"
				onClick={addTeamToTournament.bind(this, _id)}
			>
				<img src={addTeamIcon} alt="play" width="32" height="32" />
			</Button>
			<Button
				className="tournament-button"
				onClick={chooseTournament.bind(this, _id)}
			>
				<img src={editIcon} alt="edit" width="24" height="24" />
			</Button>
			<Button
				className="tournament-button ms-2"
				onClick={deleteTournament.bind(this, _id)}
			>
				<img src={deleteIcon} alt="delete" width="24" height="24" />
			</Button>
		</>
	)
}

export default ActionButtons
