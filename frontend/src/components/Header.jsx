export default function Header({ lang, setLang, onSearch, onHome, user, onLogin, onLogout }) {
  return (
    <header style={{ height:52, borderBottom:'1px solid #27272a', display:'flex', alignItems:'center', padding:'0 20px', gap:12, flexShrink:0, background:'#09090b' }}>
      <div style={{ flex:1, display:'flex', alignItems:'center', gap:10, minWidth:0 }}>
        <span onClick={onHome} style={{ fontSize:13, fontWeight:900, color:'#f59e0b', letterSpacing:3, textTransform:'uppercase', flexShrink:0, cursor:'pointer' }}>KITE</span>
        <span style={{ color:'#27272a', flexShrink:0 }}>|</span>
        <span style={{ fontSize:12, color:'#52525b', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
          {lang === 'EN' ? 'Citizen OS for India' : 'भारत का नागरिक OS'}
        </span>
      </div>

      <button onClick={onSearch}
        style={{ display:'flex', alignItems:'center', gap:8, background:'#18181b', border:'1px solid #3f3f46', borderRadius:8, padding:'6px 12px', color:'#52525b', fontSize:13, cursor:'pointer', flexShrink:0, transition:'border-color 0.15s' }}
        onMouseEnter={e => e.currentTarget.style.borderColor = '#52525b'}
        onMouseLeave={e => e.currentTarget.style.borderColor = '#3f3f46'}
      >
        <span style={{ fontSize:15 }}>⌕</span>
        <span style={{ fontSize:12 }}>Search</span>
        <kbd style={{ background:'#27272a', border:'1px solid #3f3f46', borderRadius:4, padding:'1px 5px', fontSize:10, color:'#71717a' }}>⌘K</kbd>
      </button>

      <button onClick={() => setLang(l => l === 'EN' ? 'HI' : 'EN')}
        style={{ background:'#18181b', border:'1px solid #3f3f46', borderRadius:6, padding:'5px 10px', color:'#a1a1aa', fontSize:12, fontWeight:700, cursor:'pointer', letterSpacing:1, flexShrink:0 }}
        onMouseEnter={e => e.currentTarget.style.borderColor = '#f59e0b'}
        onMouseLeave={e => e.currentTarget.style.borderColor = '#3f3f46'}
      >
        {lang === 'EN' ? 'EN | हि' : 'हि | EN'}
      </button>

      {user ? (
        <div style={{ display:'flex', alignItems:'center', gap:8, flexShrink:0 }}>
          <div style={{ width:28, height:28, borderRadius:'50%', background:'#f59e0b', display:'flex', alignItems:'center', justifyContent:'center', fontSize:12, fontWeight:900, color:'#09090b' }}>
            {user.name.charAt(0).toUpperCase()}
          </div>
          <span style={{ fontSize:12, color:'#a1a1aa', maxWidth:80, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{user.name}</span>
          <button onClick={onLogout}
            style={{ background:'none', border:'1px solid #3f3f46', borderRadius:6, padding:'4px 10px', color:'#71717a', fontSize:11, cursor:'pointer' }}>
            Out
          </button>
        </div>
      ) : (
        <button onClick={onLogin}
          style={{ background:'#f59e0b', border:'none', borderRadius:6, padding:'5px 14px', color:'#09090b', fontSize:12, fontWeight:700, cursor:'pointer', flexShrink:0 }}>
          Login
        </button>
      )}
    </header>
  );
}
