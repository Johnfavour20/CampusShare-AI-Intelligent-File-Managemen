import React, { useState } from 'react';
import { BookOpen, Eye, EyeOff } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const AuthPage: React.FC = () => {
  const { setPage, login, register } = useAppContext();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isAdminLogin, setIsAdminLogin] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form fields state
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'student' | 'faculty' | 'staff'>('student');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Clear previous errors

    let result: { success: boolean; message?: string };

    if (isLogin) {
      result = login({ email, isAdminLogin });
    } else {
      // Registration
      if (!fullName.trim()) {
        setError("Full name is required.");
        return;
      }
      result = register({
        name: fullName,
        email,
        role,
      });
    }

    if (!result.success) {
      setError(result.message || 'An unexpected error occurred.');
    }
  }

  const handleSwitchMode = () => {
      setIsLogin(!isLogin);
      setError(null);
      // Optional: clear fields on switch
      // setEmail('');
      // setFullName('');
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center p-4" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="absolute inset-0 bg-white/70 dark:bg-slate-900/80 backdrop-blur-sm"></div>
      <div className="max-w-md w-full z-10">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <BookOpen className="w-10 h-10 text-blue-500 dark:text-blue-400" />
            <span className="text-2xl font-bold text-slate-900 dark:text-white">CampusShare</span>
          </div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            {isLogin ? 'Welcome Back' : 'Create Your Account'}
          </h2>
          <p className="text-slate-700 dark:text-gray-400">
            {isLogin ? 'Sign in to your University Portal' : 'Join the secure file sharing platform'}
          </p>
        </div>

        <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur border border-slate-300/50 dark:border-blue-500/20 rounded-2xl p-8">
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg mb-4 text-sm text-center">
                <p>{error}</p>
            </div>
          )}
          <form className="space-y-6" onSubmit={handleSubmit}>
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">Full Name</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-3 bg-white/50 dark:bg-slate-900/50 border border-slate-300 dark:border-blue-500/20 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 transition"
                  placeholder="Enter your full name"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">University Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-white/50 dark:bg-slate-900/50 border border-slate-300 dark:border-blue-500/20 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 transition"
                placeholder="you@university.edu.ng"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  className="w-full px-4 py-3 bg-white/50 dark:bg-slate-900/50 border border-slate-300 dark:border-blue-500/20 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 transition pr-12"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 dark:text-gray-400 hover:text-slate-800 dark:hover:text-white"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">Role</label>
                <select 
                    value={role}
                    onChange={(e) => setRole(e.target.value as 'student' | 'faculty' | 'staff')}
                    className="w-full px-4 py-3 bg-white/50 dark:bg-slate-900/50 border border-slate-300 dark:border-blue-500/20 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 transition"
                >
                  <option value="student">Student</option>
                  <option value="faculty">Faculty</option>
                  <option value="staff">Staff</option>
                </select>
              </div>
            )}

            {isLogin && (
              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" className="rounded border-slate-400/50 dark:border-blue-500/20 bg-white/30 dark:bg-slate-900/50 text-blue-500 focus:ring-blue-500" />
                  <span className="text-sm text-slate-700 dark:text-gray-400">Remember me</span>
                </label>
                <a href="#" className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300">Forgot password?</a>
              </div>
            )}
            
            {isLogin && (
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" checked={isAdminLogin} onChange={(e) => setIsAdminLogin(e.target.checked)} className="rounded border-slate-400/50 dark:border-blue-500/20 bg-white/30 dark:bg-slate-900/50 text-blue-500 focus:ring-blue-500" />
                  <span className="text-sm text-slate-700 dark:text-gray-400">Log in as Admin</span>
                </label>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-cyan-700 transition"
            >
              {isLogin ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <span className="text-slate-700 dark:text-gray-400">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
            </span>
            <button
              onClick={handleSwitchMode}
              className="text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 font-semibold"
            >
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </div>
        </div>

        <button
          onClick={() => setPage('landing')}
          className="mt-4 w-full text-slate-800 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white transition text-sm"
        >
          ← Back to home
        </button>
      </div>
    </div>
  );
};

export default AuthPage;