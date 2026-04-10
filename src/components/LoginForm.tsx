import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginFormData } from '../schemas/authSchema';
import { useAuthStore } from '../store/authStore';
import { Mail, Lock, AlertCircle, Loader } from 'lucide-react';
import './LoginForm.css';

interface LoginFormProps {
  onSuccess?: () => void;
}

export default function LoginForm({ onSuccess }: LoginFormProps) {
  const { login, isLoading, error, clearError } = useAuthStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      clearError();
      await login(data);
      onSuccess?.();
    } catch {
      // El error ya está en el store
    }
  };

  return (
    <div className="login-form-container">
      <div className="login-form-card">
        <div className="form-header">
          <h1>Arrienda Fácil</h1>
          <p>Inicia sesión en tu cuenta</p>
        </div>

        {error && (
          <div className="error-alert">
            <AlertCircle size={20} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="form">
          {/* Email Input */}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <div className="input-wrapper">
              <Mail size={20} className="input-icon" />
              <input
                {...register('email')}
                type="email"
                id="email"
                placeholder="correo@ejemplo.com"
                disabled={isLoading}
                className={errors.email ? 'input-error' : ''}
              />
            </div>
            {errors.email && (
              <p className="error-message">{errors.email.message}</p>
            )}
          </div>

          {/* Password Input */}
          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <div className="input-wrapper">
              <Lock size={20} className="input-icon" />
              <input
                {...register('password')}
                type="password"
                id="password"
                placeholder="Ingresa tu contraseña"
                disabled={isLoading}
                className={errors.password ? 'input-error' : ''}
              />
            </div>
            {errors.password && (
              <p className="error-message">{errors.password.message}</p>
            )}
          </div>

          {/* Remember & Forgot */}
          <div className="form-footer-links">
            <label className="remember-checkbox">
              <input type="checkbox" />
              <span>Recuérdame</span>
            </label>
            <a href="#" className="forgot-password">
              ¿Olvidaste tu contraseña?
            </a>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="submit-button"
          >
            {isLoading ? (
              <>
                <Loader size={20} className="spinner" />
                Iniciando sesión...
              </>
            ) : (
              'Iniciar sesión'
            )}
          </button>
        </form>

        {/* Register Link */}
        <div className="register-link">
          <p>
            ¿No tienes cuenta?{' '}
            <a href="/register">Regístrate aquí</a>
          </p>
        </div>
      </div>
    </div>
  );
}
