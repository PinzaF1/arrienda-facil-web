import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '../schemas/authSchema';
import type { RegisterFormData } from '../schemas/authSchema';
import { useAuthStore } from '../store/authStore';
import { User, Mail, Lock, AlertCircle, Loader } from 'lucide-react';
import './RegisterForm.css';

interface RegisterFormProps {
  onSuccess?: () => void;
}

export default function RegisterForm({ onSuccess }: RegisterFormProps) {
  const { register: registerUser, isLoading, error, clearError } = useAuthStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      clearError();
      await registerUser(data);
      onSuccess?.();
    } catch {
      // El error ya está en el store
    }
  };

  return (
    <div className="register-form-container">
      <div className="register-form-card">
        <div className="form-header">
          <h1>Arrienda Fácil</h1>
          <p>Crea una nueva cuenta</p>
        </div>

        {error && (
          <div className="error-alert">
            <AlertCircle size={20} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="form">
          {/* Name Input */}
          <div className="form-group">
            <label htmlFor="name">Nombre completo</label>
            <div className="input-wrapper">
              <User size={20} className="input-icon" />
              <input
                {...register('name')}
                type="text"
                id="name"
                placeholder="Juan Pérez"
                disabled={isLoading}
                className={errors.name ? 'input-error' : ''}
              />
            </div>
            {errors.name && (
              <p className="error-message">{errors.name.message}</p>
            )}
          </div>

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

          {/* Password Confirm Input */}
          <div className="form-group">
            <label htmlFor="passwordConfirm">Confirmar contraseña</label>
            <div className="input-wrapper">
              <Lock size={20} className="input-icon" />
              <input
                {...register('passwordConfirm')}
                type="password"
                id="passwordConfirm"
                placeholder="Confirma tu contraseña"
                disabled={isLoading}
                className={errors.passwordConfirm ? 'input-error' : ''}
              />
            </div>
            {errors.passwordConfirm && (
              <p className="error-message">{errors.passwordConfirm.message}</p>
            )}
          </div>

          {/* Terms & Conditions */}
          <label className="terms-checkbox">
            <input type="checkbox" required />
            <span>
              Acepto los{' '}
              <a href="/terms" target="_blank" rel="noopener noreferrer">
                términos y condiciones
              </a>
            </span>
          </label>

          {/* Submit Button */}
          <button type="submit" disabled={isLoading} className="submit-button">
            {isLoading ? (
              <>
                <Loader size={20} className="spinner" />
                Registrando...
              </>
            ) : (
              'Crear cuenta'
            )}
          </button>
        </form>

        {/* Login Link */}
        <div className="login-link">
          <p>
            ¿Ya tienes cuenta? <a href="/login">Inicia sesión aquí</a>
          </p>
        </div>
      </div>
    </div>
  );
}
