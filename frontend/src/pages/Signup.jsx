import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../store/slices/authSlice';
import api from '../lib/api';
import { Link, useNavigate } from 'react-router-dom';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const { data } = await api.post('/auth/signup', { name, email, password, role });
      dispatch(setCredentials(data));
      navigate('/');
    } catch (e) {
      setError(e.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white border rounded-lg p-6 shadow-sm">
        <h1 className="text-2xl font-semibold mb-4">Sign Up</h1>
        {error && <div className="text-red-600 text-sm mb-2">{error}</div>}
        <form onSubmit={onSubmit} className="space-y-3">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" className="w-full border rounded-md px-3 py-2" required />
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full border rounded-md px-3 py-2" required />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full border rounded-md px-3 py-2" required />
          <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full border rounded-md px-3 py-2">
            <option value="student">Student</option>
            <option value="admin">Admin</option>
          </select>
          <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-md px-3 py-2">Create Account</button>
        </form>
        <div className="text-sm text-gray-600 mt-3">Have an account? <Link className="text-indigo-600" to="/login">Sign in</Link></div>
      </div>
    </div>
  );
}

