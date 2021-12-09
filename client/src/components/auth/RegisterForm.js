import { Button, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useState, useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import AlertMessage from '../layout/AlertMessage'

const RegisterForm = () => {
	// Context
	const { registerUser } = useContext(AuthContext)

	// Local state
	const [registerForm, setRegisterForm] = useState({
		username: '',
		password: '',
		confirmPassword: '',
	})
	const { username, password, confirmPassword } = registerForm

	const [alert, setAlert] = useState(null)

	const onChangeRegisterForm = (event) => {
		setRegisterForm({
			...registerForm,
			[event.target.name]: event.target.value,
		})
	}

	const register = async (event) => {
		event.preventDefault()

		if (password !== confirmPassword) {
			setAlert({
				type: 'warning',
				message: 'Password do not match',
			})
			setTimeout(() => setAlert(null), 3000)
			return
		}

		try {
			const registerData = await registerUser(registerForm)
			if (!registerData.success) {
				setAlert({ type: 'danger', message: registerData.message })
				setTimeout(() => {
					setAlert(null)
				}, 3000)
			}
		} catch (error) {}
	}
	return (
		<>
			<Form className="my-4" onSubmit={register}>
				<AlertMessage info={alert} />
				<Form.Group>
					<Form.Control
						type="text"
						placeholder="Username..."
						name="username"
						required
						value={username}
						onChange={onChangeRegisterForm}
					/>
				</Form.Group>
				<Form.Group className="my-2">
					<Form.Control
						type="password"
						placeholder="Password..."
						name="password"
						required
						value={password}
						onChange={onChangeRegisterForm}
					/>
				</Form.Group>
				<Form.Group>
					<Form.Control
						type="password"
						placeholder="Confirm Password..."
						name="confirmPassword"
						required
						value={confirmPassword}
						onChange={onChangeRegisterForm}
					/>
				</Form.Group>
				<Button variant="info" type="submit" className="mt-4">
					Register
				</Button>
			</Form>
			<p>
				Already have an account? <Link to="/login">Login</Link>
			</p>
		</>
	)
}

export default RegisterForm
