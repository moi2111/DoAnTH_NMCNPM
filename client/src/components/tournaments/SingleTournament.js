import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Badge from 'react-bootstrap/Badge'
import ActionButtons from './ActionButtons'

const SingleTournament = ({
	tournament: { _id, status, name, teamOrder, description },
}) => (
	<Card
		className="shadow"
		border={
			status === 'Going on'
				? 'success'
				: status === 'Initializing'
				? 'light'
				: 'warning'
		}
	>
		<Card.Body>
			<Card.Title>
				<Row>
					<Col>
						<p className="tournament-title">{name}</p>
						<Badge
							pill
							bg={
								status === 'Going on'
									? 'success'
									: status === 'Initializing'
									? 'light'
									: 'warning'
							}
						>
							{status}
						</Badge>
					</Col>
					<Col md="auto">
						<ActionButtons _id={_id} />
					</Col>
				</Row>
			</Card.Title>
			<Card.Text>{description}</Card.Text>
		</Card.Body>
	</Card>
)

export default SingleTournament
