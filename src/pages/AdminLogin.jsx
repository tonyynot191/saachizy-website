
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabase';
import BrandLogo from '../components/BrandLogo';
import './AdminLogin.css';

function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleLogin(event) {
    event.preventDefault();

    setLoading(true);
    setError('');

    try {
      const { data, error: loginError } =
        await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });

      if (loginError) throw loginError;

      const { data: adminRecord, error: adminError } =
        await supabase
          .from('admin_users')
          .select('user_id')
          .eq('user_id', data.user.id)
          .maybeSingle();

      if (adminError) throw adminError;

      if (!adminRecord) {
        await supabase.auth.signOut();
        throw new Error('You are not authorised to access the admin dashboard.');
      }

      navigate('/admin', { replace: true });
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="admin-login-page">
      <div className="admin-login-card">
        <BrandLogo
  className="admin-login-logo"
  variant="header"
/>

        <div className="admin-login-heading">
          <p className="admin-login-eyebrow">ADMINISTRATION</p>
          <h1>Welcome Back</h1>
          <p>Sign in to manage your Saachizy platform.</p>
        </div>

        <form onSubmit={handleLogin}>
          <div className="admin-login-field">
            <label htmlFor="admin-email">Email Address</label>
            <input
              id="admin-email"
              type="email"
              placeholder="Enter your admin email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              autoComplete="username"
            />
          </div>

          <div className="admin-login-field">
            <label htmlFor="admin-password">Password</label>
            <input
              id="admin-password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              autoComplete="current-password"
            />
          </div>

          {error && (
            <div className="admin-login-error">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="admin-login-button"
            disabled={loading}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <p className="admin-login-footer">
          SAACHIZY — THE STORY. THE VISION. THE FUTURE.
        </p>
      </div>
    </main>
  );
}

export default AdminLogin;
