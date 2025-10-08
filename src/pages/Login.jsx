import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '@styles/form.css';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log({ email, password });
    };

    return (
        <main className="container">
            <form className="form" onSubmit={handleSubmit}>
                <h1 className="form-title">Iniciar sesión</h1>
                
                <div className="form-field">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="usuario@ejemplo.com"
                        required
                    />
                </div>

                <div className="form-field">
                    <label htmlFor="password">Contraseña</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="**********"
                        required
                    />
                </div>

                <button type="submit" className="submit-button">
                    Iniciar sesión
                </button>
            </form>
        </main>
    );
}

export default Login;
