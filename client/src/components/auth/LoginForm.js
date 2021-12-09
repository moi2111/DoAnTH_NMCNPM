import { Button, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useState, useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import AlertMessage from '../layout/AlertMessage'

const LoginForm = () => {
	// Context
	const { loginUser } = useContext(AuthContext)

	// Local state
	const [loginForm, setLoginForm] = useState({
		username: '',
		password: '',
	})
	const { username, password } = loginForm

	const [alert, setAlert] = useState(null)

	const onChangeLoginForm = (event) => {
		setLoginForm({
			...loginForm,
			[event.target.name]: event.target.value,
		})
	}

	const login = async (event) => {
		event.preventDefault()

		try {
			const loginData = await loginUser(loginForm)
			if (!loginData.success) {
				setAlert({ type: 'danger', message: loginData.message })
				setTimeout(() => {
					setAlert(null)
				}, 3000)
			}
		} catch (error) {}
	}

	return (
		<>
			<Form className="my-4" onSubmit={login}>
				<AlertMessage info={alert} />
				<Form.Group>
					<Form.Control
						type="text"
						placeholder="Username..."
						name="username"
						required
						value={username}
						onChange={onChangeLoginForm}
					/>
				</Form.Group>
				<Form.Group className="mt-2">
					<Form.Control
						type="password"
						placeholder="Password..."
						name="password"
						required
						value={password}
						onChange={onChangeLoginForm}
					/>
				</Form.Group>
				<Button variant="success" type="submit" className="mt-4">
					Login
				</Button>
			</Form>
			<p>
				Don't have an account? <Link to="/register">Register</Link>
			</p>
			<p>
				<Link to="/dashboard">Login as GUEST</Link>
			</p>
		</>
	)
}

export default LoginForm
