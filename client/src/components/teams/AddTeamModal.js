import { Modal, Button, Form } from 'react-bootstrap'
import { TeamContext } from '../../contexts/TeamContext'
import { useContext, useState } from 'react'
import { TournamentContext } from '../../contexts/TournamentContext'

const AddTeamModal = () => {
	// Context
	const { addTeam, showAddTeamModal, setShowAddTeamModal } =
		useContext(TeamContext)
	// Context
	const {
		tournamentState: { tournament },
		setShowToast,
	} = useContext(TournamentContext)

	// State
	const [newTeam, setNewTeam] = useState({
		name: '',
		logo: '',
		trainer: '',
	})
	const { name, logo, trainer } = newTeam

	const onChangeNewTeam = (event) =>
		setNewTeam({
			...newTeam,
			[event.target.name]: event.target.value,
		})

	const closeDialog = () => {
		setNewTeam({ name: '', logo: '', trainer: '' })
		setShowAddTeamModal(false)
	}

	const onSubmit = async (event) => {
		event.preventDefault()
		console.log(tournament)
		const { success, message } = await addTeam(tournament._id, newTeam)
		closeDialog()
		setShowToast({
			show: true,
			message,
			type: success ? 'success' : 'danger',
		})
	}

	return (
		<Modal show={showAddTeamModal} onHide={closeDialog}>
			<Modal.Header closeButton>
				<Modal.Title>What do you want to add a new TEAM?</Modal.Title>
			</Modal.Header>
			<Form onSubmit={onSubmit}>
				<Modal.Body>
					<Form.Group className="mt-2">
						<Form.Control
							type="text"
							name="tournamentName"
							required
							value={tournament.name}
							readOnly
						/>
					</Form.Group>
					<Form.Group className="my-2">
						<Form.Control
							type="text"
							placeholder="Name"
							name="name"
							required
							aria-describedby="name-help"
							value={name}
							onChange={onChangeNewTeam}
						/>
						<Form.Text id="name-help" muted>
							Required
						</Form.Text>
					</Form.Group>
					<Form.Group className="mt-2">
						<Form.Control
							type="text"
							placeholder="Logo"
							name="logo"
							required
							value={logo}
							onChange={onChangeNewTeam}
						/>
					</Form.Group>
					<Form.Group className="my-2">
						<Form.Control
							type="text"
							placeholder="Trainer"
							name="trainer"
							required
							value={trainer}
							onChange={onChangeNewTeam}
						/>
					</Form.Group>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={closeDialog}>
						Cancel
					</Button>
					<Button variant="primary" type="submit">
						Add team
					</Button>
				</Modal.Footer>
			</Form>
		</Modal>
	)
}

export default AddTeamModal
