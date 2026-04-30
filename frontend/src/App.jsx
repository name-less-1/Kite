import { useEffect, useState } from 'react';
import Sidebar         from './components/Sidebar';
import Header          from './components/Header';
import StatePills      from './components/StatePills';
import CityAlert       from './components/CityAlert';
import SearchModal     from './components/SearchModal';
import ApplyModal      from './components/ApplyModal';
import RightSidebar    from './components/RightSidebar';
import HomeView        from './views/HomeView';
import SchemesView     from './views/SchemesView';
import JobsView        from './views/JobsView';
import JanSevaView     from './views/JanSevaView';
import AntarikshView   from './views/AntarikshView';
import RakshaView      from './views/RakshaView';
import LegislativeView from './views/LegislativeView';
import LoginView       from './views/LoginView';
import RegisterView    from './views/RegisterView';

export default function App() {
  const [activeNav,   setActiveNav]  = useState('home');
  const [lang,        setLang]       = useState('EN');
  const [stateFilter, setStateFilt]  = useState('National');
  const [searchOpen,  setSearchOpen] = useState(false);
  const [applyScheme, setApply]      = useState(null);
  const [user,        setUser]       = useState(() => {
    const saved = localStorage.getItem('kite_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [token,       setToken]      = useState(() => localStorage.getItem('kite_token') || null);
  const [authView,    setAuthView]   = useState(null); // 'login' | 'register' | null

  useEffect(() => {
    const handler = e => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); setSearchOpen(true); }
      if (e.key === 'Escape') { setSearchOpen(false); setApply(null); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const handleLogin = (userData, userToken) => {
    setUser(userData);
    setToken(userToken);
    setAuthView(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('kite_token');
    localStorage.removeItem('kite_user');
    setUser(null);
    setToken(null);
    setActiveNav('home');
  };

  const renderView = () => {
    if (authView === 'login')    return <LoginView    onLogin={handleLogin} onSwitch={() => setAuthView('register')} />;
    if (authView === 'register') return <RegisterView onLogin={handleLogin} onSwitch={() => setAuthView('login')} />;

    switch (activeNav) {
      case 'home':        return <HomeView        setActive={setActiveNav} onApply={setApply} />;
      case 'schemes':     return <SchemesView     onApply={setApply} stateFilter={stateFilter} />;
      case 'jobs':        return <JobsView        onApply={setApply} />;
      case 'janseva':     return <JanSevaView     user={user} token={token} onLoginRequest={() => setAuthView('login')} />;
      case 'antariksh':   return <AntarikshView />;
      case 'raksha':      return <RakshaView />;
      case 'legislative': return <LegislativeView />;
      default:            return <HomeView        setActive={setActiveNav} onApply={setApply} />;
    }
  };

  return (
    <div style={{ display:'flex', height:'100vh', background:'#09090b', color:'#e4e4e7', overflow:'hidden' }}>
      {searchOpen && (
        <SearchModal
          onClose={() => setSearchOpen(false)}
          onSelectScheme={s => { setApply(s); setSearchOpen(false); }}
          onSelectLaw={() => { setActiveNav('legislative'); setSearchOpen(false); }}
        />
      )}
      {applyScheme && <ApplyModal scheme={applyScheme} onClose={() => setApply(null)} />}

      <Sidebar active={activeNav} setActive={id => { setAuthView(null); setActiveNav(id); }} />

      <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden', minWidth:0 }}>
        <Header
          lang={lang} setLang={setLang}
          onSearch={() => setSearchOpen(true)}
          onHome={() => { setAuthView(null); setActiveNav('home'); }}
          user={user}
          onLogin={() => setAuthView('login')}
          onLogout={handleLogout}
        />
        {!authView && <StatePills selected={stateFilter} onSelect={setStateFilt} />}
        {!authView && <CityAlert />}
        <div style={{ flex:1, overflowY:'auto', overflowX:'hidden' }}>
          {renderView()}
        </div>
      </div>

      <RightSidebar />
    </div>
  );
}
