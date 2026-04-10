export default function LoginPage() {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    }}>
      <div style={{
        background: 'white',
        borderRadius: '12px',
        padding: '40px',
        width: '100%',
        maxWidth: '420px',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
      }}>
        <h1 style={{ textAlign: 'center', color: '#1f2937', margin: '0 0 8px 0' }}>
          Arrienda Fácil
        </h1>
        <p style={{ textAlign: 'center', color: '#6b7280', margin: '0 0 32px 0' }}>
          Inicia sesión en tu cuenta
        </p>

        <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }} onSubmit={(e) => {
          e.preventDefault();
          alert('Login enviado');
        }}>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>
              Email
            </label>
            <input
              type="email"
              placeholder="correo@ejemplo.com"
              style={{
                width: '100%',
                padding: '12px',
                border: '2px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '14px',
                boxSizing: 'border-box',
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>
              Contraseña
            </label>
            <input
              type="password"
              placeholder="Ingresa tu contraseña"
              style={{
                width: '100%',
                padding: '12px',
                border: '2px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '14px',
                boxSizing: 'border-box',
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              padding: '12px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '15px',
              fontWeight: '600',
              cursor: 'pointer',
            }}
          >
            Iniciar sesión
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '20px', color: '#6b7280' }}>
          ¿No tienes cuenta? <a href="/register" style={{ color: '#667eea', textDecoration: 'none' }}>Regístrate aquí</a>
        </p>
      </div>
    </div>
  );
}
