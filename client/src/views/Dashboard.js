import {
	Container,
	Tooltip,
	OverlayTrigger,
	Toast,
	Spinner,
	Card,
	Button,
	Row,
	Col,
} from 'react-bootstrap'
import { TournamentContext } from '../contexts/TournamentContext'
import { useContext, useEffect } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import SingleTournament from '../components/tournaments/SingleTournament'
import AddTournamentModal from '../components/tournaments/AddTournamentModal'
import UpdateTournamentModal from '../components/tournaments/UpdateTournamentModal'
import addIcon from '../assets/plus-circle-fill.svg'
import AddTeamModal from '../components/teams/AddTeamModal'

const Dashboard = () => {
	// Contexts
	const {
		authState: {
			user: { username },
		},
	} = useContext(AuthContext)

	const {
		tournamentState: { tournament, tournaments, tournamentsLoading },
		getTournaments,
		setShowAddTournamentModal,
		showToast: { show, message, type },
		setShowToast,
	} = useContext(TournamentContext)

	// Start: Get all tournaments
	useEffect(() => getTournaments(), [])

	let body = null

	if (tournamentsLoading) {
		body = (
			<div className="spinner-container">
				<Spinner animation="border" variant="info" />
			</div>
		)
	} else if (tournaments.length === 0) {
		body = (
			<>
				<Card className="text-center mx-5 my-5">
					<Card.Header as="h1">Hi {username}</Card.Header>
					<Card.Body>
						<Card.Title>Welcome to the app</Card.Title>
						<Card.Text>
							Click the button below to track your first
							tournament
						</Card.Text>
						<Button
							variant="primary"
							onClick={setShowAddTournamentModal.bind(this, true)}
						>
							Add a new tournament
						</Button>
					</Card.Body>
				</Card>
			</>
		)
	} else {
		body = (
			<>
				<Row className="row-cols-1 row-cols-md-1 g-4 mx-auto mt-3">
					{tournaments.map((tournament) => (
						<Col key={tournament._id} className="my-2">
							<SingleTournament tournament={tournament} />
						</Col>
					))}
				</Row>

				{/* Open add tournament modal */}
				<OverlayTrigger
					placement="left"
					overlay={<Tooltip>Add a new tournament</Tooltip>}
				>
					<Button
						className="btn-floating"
						onClick={setShowAddTournamentModal.bind(this, true)}
					>
						<img
							src={addIcon}
							alt="addIcon"
							width="60"
							height="60"
						/>
					</Button>
				</OverlayTrigger>
			</>
		)
	}

	return (
		<Container>
			{body}
			<AddTournamentModal />
			{tournament !== {} && <UpdateTournamentModal />}

			{/* After tournament is created, show toast */}
			<Toast
				show={show}
				style={{
					position: 'fixed',
					top: '20%',
					right: '10px',
					width: 'unset',
				}}
				className={`bg-${type} text-white`}
				onClose={setShowToast.bind(this, {
					show: false,
					message: '',
					type: null,
				})}
				delay={3000}
				autohide
			>
				<Toast.Body>
					<strong>{message}</strong>
				</Toast.Body>
			</Toast>
			<AddTeamModal />
		</Container>
	)
}

export default Dashboard
