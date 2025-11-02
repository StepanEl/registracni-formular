import { useState } from "react"
import './Ragistration.css'

interface User {
    username: string,
    email: string,
    password: string,
    passwordConfirm: string,
}

export const Registration = () => {
    const [user, setUser] = useState<User>(
        {
            username: '',
            email: '',
            password: '',
            passwordConfirm: ''
        },
    )
    const [error, setError] = useState<string>('')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        const updatedUser = { ...user, [name]: value };

        if (name === 'email' && value.includes('@') && user.username.trim() === '') {
            const usernameFromEmail = value.split('@')[0];
            updatedUser.username = usernameFromEmail;
        }

        setUser(updatedUser)
    }

 const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!user.username.trim() || !user.email.trim() || !user.password.trim() || !user.passwordConfirm.trim()) {
        setError('Please fill in all fields.')
        return
    }

    if (user.password !== user.passwordConfirm) {
        setError('Passwords do not match!')
        return
    }

    setError('')
    console.log('User registered:', user)
}

    return (
        <form className="registration"
            onSubmit={handleSubmit}>

            <div className="icon-wrapper">
                <div className="outer-circle">
                    <div className="inner-circle">
                        <span className="user-icon">👤</span>
                    </div>
                </div>
            </div>

            <label htmlFor="email">
                <input
                    id="email"
                    type="email"
                    name='email'
                    onChange={handleChange}
                    value={user.email}
                    placeholder="Email Address"
                /> 
            </label>

            <label htmlFor="username">
                <input
                    id="username"
                    type="text"
                    name='username'
                    onChange={handleChange}
                    value={user.username}
                    placeholder="User Name"
                />
            </label>

            <label htmlFor="password">
                <input
                    id="password"
                    type="password"
                    name='password'
                    onChange={handleChange}
                    value={user.password}
                    placeholder="Password"
                />
            </label>

            <label htmlFor="passwordConfirm">
                <input
                    id="passwordConfirm"
                    type="password"
                    name='passwordConfirm'
                    onChange={handleChange}
                    value={user.passwordConfirm}
                    placeholder="Confirm Password"
                />
            </label>

            {error && <p className="error-message">{error}</p>}


            <button type="submit">REGISTER</button>

        </form >
    )
}