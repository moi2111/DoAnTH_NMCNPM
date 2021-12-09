import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import logoutIcon from '../../assets/logout.svg'
import ballLogo from '../../assets/ballLogo.png'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'
import { useContext } from 'react'

const NavbarMenu = () => {
	const {
		authState: {
			user: { username },
		},
		logoutUser,
	} = useContext(AuthContext)

	const logout = () => logoutUser()

	return (
		<Navbar expand="lg" bg="primary" variant="dark" className="shadow">
			<Container>
				<Navbar.Brand className="font-weight-bolder text-white">
					<img
						src={ballLogo}
						alt="ballLogo"
						width="32"
						height="32"
						className="me-2"
					/>
					Quản lý đội bóng
				</Navbar.Brand>

				<Navbar.Toggle aria-controls="basic-navbar-nav" />

				<Navbar.Collapse id="basic-navbar-nav">
					<Nav>
						<Nav.Link
							className="font-weight-bolder text-white"
							to="/dashboard"
							as={Link}
						>
							Dashboard
						</Nav.Link>
						<Nav.Link
							className="font-weight-bolder text-white"
							to="/teams"
							// as={Link}
						>
							{/* Teams */}
						</Nav.Link>
						<Nav.Link
							className="font-weight-bolder text-white"
							to="/about"
							as={Link}
						>
							About
						</Nav.Link>
					</Nav>
				</Navbar.Collapse>
				<Nav>
					<Nav.Link
						className="font-weight-bolder text-white"
						disabled
					>
						Welcome {username}
					</Nav.Link>
					<Button
						variant="secondary"
						className="font-weight-bolder text-white"
						onClick={logout}
					>
						<img
							src={logoutIcon}
							alt="logoutIcon"
							width="32"
							height="32"
							className="me-2"
						/>
						Logout
					</Button>
				</Nav>
			</Container>
		</Navbar>
	)
}

export default NavbarMenu
