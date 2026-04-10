import { useState } from 'react';
import './SimpleLoginForm.css';

interface SimpleLoginFormProps {
  onSuccess?: () => void;
}

export default function SimpleLoginForm({ onSuccess }: SimpleLoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    console.log('Login intent:', { email, password });
    // Simular un delay
    setTimeout(() => {
      setLoading(false);
      alert('Formulario enviado:\n' + JSON.stringify({ email, password }, null, 2));
    }, 1000);
  };

  return (
    <div className="simple-login-container">
      <div className="simple-login-card">
        <h1>Arrienda Fácil</h1>
        <p>Inicia sesión en tu cuenta</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="correo@ejemplo.com"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label>Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingresa tu contraseña"
              disabled={loading}
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
          </button>
        </form>

        <p style={{ marginTop: '20px', textAlign: 'center' }}>
          ¿No tienes cuenta? <a href="/register">Regístrate aquí</a>
        </p>
      </div>
    </div>
  );
}
