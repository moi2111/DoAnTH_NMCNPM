import { Button } from 'react-bootstrap'
import addTeamIcon from '../../assets/person-plus.svg'
import editIcon from '../../assets/pencil.svg'
import deleteIcon from '../../assets/trash.svg'
import { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { TeamContext } from '../../contexts/TeamContext'

const ActionTeamButtons = ({ _id }) => {
	// Context
	const { deleteTeam, findTeam, setShowUpdateTeamModal } =
		useContext(TeamContext)

	const chooseTeamUpdate = (teamId) => {
		console.log(teamId)
		findTeam(teamId)
		setShowUpdateTeamModal(true)
	}

	return (
		<>
			<Button
				variant="dark"
				// onClick={showTeamsOfTournament.bind(this, _id)}
			>
				List Players
			</Button>
			<Button
				className="tournament-button"
				// onClick={addTeamToTournament.bind(this, _id)}
			>
				<img src={addTeamIcon} alt="play" width="32" height="32" />
			</Button>
			<Button
				className="tournament-button"
				onClick={chooseTeamUpdate.bind(this, _id)}
			>
				<img src={editIcon} alt="edit" width="24" height="24" />
			</Button>
			<Button
				className="tournament-button ms-2"
				onClick={deleteTeam.bind(this, _id)}
			>
				<img src={deleteIcon} alt="delete" width="24" height="24" />
			</Button>
		</>
	)
}

export default ActionTeamButtons
