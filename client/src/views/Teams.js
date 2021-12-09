import { useContext, useEffect } from 'react'
import { Card, Container, Row, Spinner, Table } from 'react-bootstrap'
import { AuthContext } from '../contexts/AuthContext'
import { TeamContext } from '../contexts/TeamContext'
import { TournamentContext } from '../contexts/TournamentContext'
import SingleTeam from '../components/teams/SingleTeam'
import UpdateTeamModal from '../components/teams/UpdateTeamModal'

const Teams = () => {
	// Contexts
	const {
		authState: {
			user: { username },
		},
	} = useContext(AuthContext)

	const {
		teamState: { team, teams, teamsLoading },
		getTeamsOfTournamentId,
	} = useContext(TeamContext)

	const {
		tournamentState: { tournament },
	} = useContext(TournamentContext)

	// Start: Get all teams
	useEffect(() => {
		getTeamsOfTournamentId(tournament._id)
	}, [])

	let body = null

	if (teamsLoading) {
		body = (
			<div className="spinner-container">
				<Spinner animation="border" variant="info" />
			</div>
		)
	} else if (teams.length === 0) {
		body = (
			<>
				<Card className="text-center mx-5 my-5">
					<Card.Header as="h1">Hi {username}</Card.Header>
					<Card.Body>
						<Card.Title>Welcome to the app</Card.Title>
						<Card.Text>
							There are currently no teams, go back to the league
							to add more teams
						</Card.Text>
					</Card.Body>
				</Card>
			</>
		)
	} else {
		body = (
			<>
				<Row className="row-cols-1 row-cols-md-1 g-4 mx-auto mt-3">
					<Table striped bordered hover>
						<thead>
							<tr>
								<th>Logo</th>
								<th>Name</th>
								<th>Trainer</th>
								<th>Participate in the tournament</th>
								<th>Quantity</th>
							</tr>
						</thead>
						<tbody>
							{teams.map((team) => (
								<tr key={team._id}>
									<SingleTeam team={team} />
								</tr>
							))}
						</tbody>
					</Table>
				</Row>
			</>
		)
	}

	return (
		<Container>
			{body}
			{team !== {} && <UpdateTeamModal />}
		</Container>
	)
}

export default Teams
