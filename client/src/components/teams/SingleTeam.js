import { Table } from 'react-bootstrap'
import ActionTeamButtons from './ActionTeamButtons'

const SingleTeam = ({
	team: { _id, tournament, name, playerOrder, logo, trainer },
}) => {
	return (
		<>
			<td>
				<img
					src={logo}
					alt="ảnh logo đội bóng"
					width="36"
					height="36"
				/>
			</td>
			<td>{name}</td>
			<td>{trainer}</td>
			<td>{tournament.name}</td>
			<td className="text-center">{playerOrder.length}</td>
			<td className="d-flex" style={{ justifyContent: 'flex-end' }}>
				<ActionTeamButtons _id={_id} />
			</td>
		</>
	)
}

export default SingleTeam
