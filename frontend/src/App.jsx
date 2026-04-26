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


export default function App() {
  const [activeNav,   setActiveNav]  = useState('home');
  const [lang,        setLang]       = useState('EN');
  const [stateFilter, setStateFilt]  = useState('National');
  const [searchOpen,  setSearchOpen] = useState(false);
  const [applyScheme, setApply]      = useState(null);

  useEffect(() => {
    const handler = e => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); setSearchOpen(true); }
      if (e.key === 'Escape') { setSearchOpen(false); setApply(null); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const renderView = () => {
    switch (activeNav) {
      case 'home':        return <HomeView        setActive={setActiveNav} onApply={setApply} />;
      case 'schemes':     return <SchemesView     onApply={setApply} stateFilter={stateFilter} />;
      case 'jobs':        return <JobsView        onApply={setApply} />;
      case 'janseva':     return <JanSevaView />;
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

      <Sidebar active={activeNav} setActive={setActiveNav} />

      <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden', minWidth:0 }}>
        <Header lang={lang} setLang={setLang} onSearch={() => setSearchOpen(true)} />
        <StatePills selected={stateFilter} onSelect={setStateFilt} />
        <CityAlert />
        <div style={{ flex:1, overflowY:'auto', overflowX:'hidden' }}>
          {renderView()}
        </div>
      </div>

      <RightSidebar />
    </div>
  );
}