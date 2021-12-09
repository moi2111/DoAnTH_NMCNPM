import { Modal, Button, Form } from 'react-bootstrap'
import { TournamentContext } from '../../contexts/TournamentContext'
import { useContext, useState } from 'react'

const AddTournamentModal = () => {
	// Context
	const {
		showAddTournamentModal,
		setShowAddTournamentModal,
		addTournament,
		setShowToast,
	} = useContext(TournamentContext)

	// State
	const [newTournament, setNewTournament] = useState({
		name: '',
		description: '',
		status: 'Initializing',
	})
	const { name, description } = newTournament

	const onChangeNewTournament = (event) =>
		setNewTournament({
			...newTournament,
			[event.target.name]: event.target.value,
		})

	const closeDialog = () => {
		resetAddTournamentData()
	}

	const onSubmit = async (event) => {
		event.preventDefault()
		const { success, message } = await addTournament(newTournament)
		resetAddTournamentData()
		setShowToast({
			show: true,
			message,
			type: success ? 'success' : 'danger',
		})
	}

	const resetAddTournamentData = () => {
		setNewTournament({
			name: '',
			description: '',
			status: 'Initializing',
		})
		setShowAddTournamentModal(false)
	}

	return (
		<Modal show={showAddTournamentModal} onHide={closeDialog}>
			<Modal.Header closeButton>
				<Modal.Title>
					What do you want to add a new tournament?
				</Modal.Title>
			</Modal.Header>
			<Form onSubmit={onSubmit}>
				<Modal.Body>
					<Form.Group>
						<Form.Control
							type="text"
							placeholder="Name"
							name="name"
							required
							aria-describedby="name-help"
							value={name}
							onChange={onChangeNewTournament}
						/>
						<Form.Text id="name-help" muted>
							Required
						</Form.Text>
					</Form.Group>
					<Form.Group className="mt-2">
						<Form.Control
							as="textarea"
							rows={3}
							placeholder="Description"
							name="description"
							value={description}
							onChange={onChangeNewTournament}
						/>
					</Form.Group>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={closeDialog}>
						Cancel
					</Button>
					<Button variant="primary" type="submit">
						Đồng ý
					</Button>
				</Modal.Footer>
			</Form>
		</Modal>
	)
}

export default AddTournamentModal
