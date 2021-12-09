import { Modal, Button, Form } from 'react-bootstrap'
import { TournamentContext } from '../../contexts/TournamentContext'
import { useContext, useEffect, useState } from 'react'

const UpdateTournamentModal = () => {
	// Context
	const {
		tournamentState: { tournament },
		showUpdateTournamentModal,
		setShowUpdateTournamentModal,
		updateTournament,
		setShowToast,
	} = useContext(TournamentContext)

	// State
	const [updatedTournament, setUpdatedTournament] = useState(tournament)

	useEffect(() => setUpdatedTournament(tournament), [tournament])

	const { name, description, status } = updatedTournament

	const onChangeUpdatedTournament = (event) =>
		setUpdatedTournament({
			...updatedTournament,
			[event.target.name]: event.target.value,
		})

	const closeDialog = () => {
		setUpdatedTournament(tournament)
		setShowUpdateTournamentModal(false)
	}

	const onSubmit = async (event) => {
		event.preventDefault()
		const { success, message } = await updateTournament(updatedTournament)
		setShowUpdateTournamentModal(false)
		setShowToast({
			show: true,
			message,
			type: success ? 'success' : 'danger',
		})
	}

	// const resetAddTournamentData = () => {
	// 	setNewTournament({
	// 		name: '',
	// 		description: '',
	// 		status: 'Initializing',
	// 	})
	// 	setShowAddTournamentModal(false)
	// }

	return (
		<Modal show={showUpdateTournamentModal} onHide={closeDialog}>
			<Modal.Header closeButton>
				<Modal.Title>Do you want to update the tournament?</Modal.Title>
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
							onChange={onChangeUpdatedTournament}
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
							onChange={onChangeUpdatedTournament}
						/>
					</Form.Group>
					<Form.Group className="mt-2">
						<Form.Control
							as="select"
							value={status}
							name="status"
							onChange={onChangeUpdatedTournament}
						>
							<option value="Initializing">Initializing</option>
							<option value="Going on">Going on</option>
							<option value="Finished">Finished</option>
						</Form.Control>
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

export default UpdateTournamentModal
