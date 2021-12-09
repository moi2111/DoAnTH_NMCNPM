import { Modal, Button, Form } from 'react-bootstrap'
import { useContext, useEffect, useState } from 'react'
import { TeamContext } from '../../contexts/TeamContext'

const UpdateTeamModal = () => {
	// Context
	const {
		teamState: { team },
		showUpdateTeamModal,
		setShowUpdateTeamModal,
		updateTeam,
	} = useContext(TeamContext)

	// State
	const [updatedTeam, setUpdatedTeam] = useState(team)

	useEffect(() => setUpdatedTeam(team), [team])

	const { name, logo, trainer } = updatedTeam

	const onChangeUpdatedTeam = (event) => {
		setUpdatedTeam({
			...updatedTeam,
			[event.target.name]: event.target.value,
		})
	}

	const closeDialog = () => {
		setUpdatedTeam(team)
		setShowUpdateTeamModal(false)
	}

	const onSubmit = async (event) => {
		event.preventDefault()
		const { success, message } = await updateTeam(updatedTeam)
		setShowUpdateTeamModal(false)
	}

	return (
		<Modal show={showUpdateTeamModal} onHide={closeDialog}>
			<Modal.Header closeButton>
				<Modal.Title>Do you want to update the team?</Modal.Title>
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
							onChange={onChangeUpdatedTeam}
						/>
						<Form.Text id="name-help" muted>
							Required
						</Form.Text>
					</Form.Group>
					<Form.Group className="my-2">
						<Form.Control
							type="text"
							placeholder="Logo"
							name="logo"
							value={logo}
							onChange={onChangeUpdatedTeam}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Control
							type="text"
							placeholder="Trainer"
							name="trainer"
							value={trainer}
							onChange={onChangeUpdatedTeam}
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

export default UpdateTeamModal
