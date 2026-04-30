import { useState } from 'react';
import { STATES } from '../data';

const API = 'https://kite-3cun.onrender.com';

export default function RegisterView({ onLogin, onSwitch }) {
  const [name, setName]         = useState('');
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [state, setState]       = useState('National');
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);

  const handleSubmit = async () => {
    setError('');
    if (!name || !email || !password) return setError('All fields required');
    if (password.length < 6) return setError('Password must be at least 6 characters');
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, state }),
      });
      const data = await res.json();
      if (!res.ok) return setError(data.message || 'Registration failed');
      localStorage.setItem('kite_token', data.token);
      localStorage.setItem('kite_user', JSON.stringify(data.user));
      onLogin(data.user, data.token);
    } catch {
      setError('Something went wrong. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:'100%', padding:20 }}>
      <div style={{ background:'#18181b', border:'1px solid #27272a', borderRadius:14, padding:32, width:'100%', maxWidth:380 }}>
        <div style={{ textAlign:'center', marginBottom:28 }}>
          <div style={{ fontSize:22, fontWeight:900, color:'#f59e0b', letterSpacing:3, marginBottom:4 }}>KITE</div>
          <div style={{ fontSize:14, fontWeight:700, color:'#e4e4e7', marginBottom:4 }}>Create your account</div>
          <div style={{ fontSize:12, color:'#71717a' }}>Join the citizen platform</div>
        </div>

        {error && (
          <div style={{ background:'#7f1d1d', border:'1px solid #991b1b', borderRadius:8, padding:'8px 12px', fontSize:12, color:'#fca5a5', marginBottom:16 }}>
            {error}
          </div>
        )}

        <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
          <div>
            <label style={{ fontSize:11, color:'#71717a', fontWeight:600, textTransform:'uppercase', letterSpacing:1 }}>Full Name</label>
            <input
              type="text" value={name} onChange={e => setName(e.target.value)}
              placeholder="Username"
              style={{ width:'100%', marginTop:6, background:'#09090b', border:'1px solid #3f3f46', borderRadius:8, padding:'9px 12px', color:'#e4e4e7', fontSize:13, outline:'none', boxSizing:'border-box' }}
            />
          </div>
          <div>
            <label style={{ fontSize:11, color:'#71717a', fontWeight:600, textTransform:'uppercase', letterSpacing:1 }}>Email</label>
            <input
              type="email" value={email} onChange={e => setEmail(e.target.value)}
              placeholder="you@example.com"
              style={{ width:'100%', marginTop:6, background:'#09090b', border:'1px solid #3f3f46', borderRadius:8, padding:'9px 12px', color:'#e4e4e7', fontSize:13, outline:'none', boxSizing:'border-box' }}
            />
          </div>
          <div>
            <label style={{ fontSize:11, color:'#71717a', fontWeight:600, textTransform:'uppercase', letterSpacing:1 }}>Password</label>
            <input
              type="password" value={password} onChange={e => setPassword(e.target.value)}
              placeholder="Min. 6 characters"
              style={{ width:'100%', marginTop:6, background:'#09090b', border:'1px solid #3f3f46', borderRadius:8, padding:'9px 12px', color:'#e4e4e7', fontSize:13, outline:'none', boxSizing:'border-box' }}
            />
          </div>
          <div>
            <label style={{ fontSize:11, color:'#71717a', fontWeight:600, textTransform:'uppercase', letterSpacing:1 }}>Your State</label>
            <select value={state} onChange={e => setState(e.target.value)}
              style={{ width:'100%', marginTop:6, background:'#09090b', border:'1px solid #3f3f46', borderRadius:8, padding:'9px 12px', color:'#e4e4e7', fontSize:13, outline:'none', boxSizing:'border-box' }}>
              {STATES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <button onClick={handleSubmit} disabled={loading}
            style={{ background:'#f59e0b', border:'none', borderRadius:8, padding:'10px', fontWeight:700, fontSize:13, color:'#09090b', cursor:'pointer', marginTop:4, opacity: loading ? 0.7 : 1 }}>
            {loading ? 'Creating account...' : 'Create Account →'}
          </button>
        </div>

        <div style={{ textAlign:'center', marginTop:20, fontSize:12, color:'#71717a' }}>
          Already have an account?{' '}
          <span onClick={onSwitch} style={{ color:'#f59e0b', cursor:'pointer', fontWeight:600 }}>Sign In</span>
        </div>
      </div>
    </div>
  );
}
