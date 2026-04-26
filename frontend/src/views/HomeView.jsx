import SchemeCard from '../components/SchemeCard';
import { SCHEMES } from '../data';

const STATS = [
  { label:'Active Schemes', value:'127', emoji:'⊞' },
  { label:'States Covered', value:'36',  emoji:'◈' },
  { label:'Resolved Tickets',value:'8.4K',emoji:'✓' },
  { label:'Laws Tracked',   value:'42',  emoji:'⊙' },
];
const TILES = [
  { id:'schemes',     emoji:'⊞', label:'Scheme Explorer',  desc:'127 national & state schemes across all demographics' },
  { id:'janseva',     emoji:'⊗', label:'Jan-Seva',          desc:'Report civic issues — potholes, waste, broken lights' },
  { id:'antariksh',   emoji:'◎', label:'Antariksh',         desc:'ISRO missions, satellite launches & research patents' },
  { id:'raksha',      emoji:'◆', label:'Raksha',            desc:'Defense hardware spotlight & recruitment alerts' },
  { id:'legislative', emoji:'⊙', label:'Legislative',       desc:'New laws explained in plain, simple language' },
  { id:'jobs',        emoji:'⊕', label:'Job Hub',           desc:'Profession-specific schemes & national job portals' },
];

export default function HomeView({ setActive, onApply }) {
  return (
    <div style={{ padding:'20px 20px 40px' }}>
      <div style={{ marginBottom:24 }}>
        <h1 style={{ margin:'0 0 6px', fontSize:26, fontWeight:900, letterSpacing:-0.8 }}>Welcome to <span style={{ color:'#f59e0b' }}>KITE</span></h1>
        <p style={{ margin:0, color:'#71717a', fontSize:13 }}>Your gateway to government schemes, civic action, space & national intelligence.</p>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:10, marginBottom:24 }}>
        {STATS.map(s => (
          <div key={s.label} style={{ background:'#18181b', border:'1px solid #27272a', borderRadius:10, padding:14 }}>
            <div style={{ fontSize:18, marginBottom:8 }}>{s.emoji}</div>
            <div style={{ fontSize:24, fontWeight:900, color:'#f59e0b', letterSpacing:-0.5, lineHeight:1 }}>{s.value}</div>
            <div style={{ fontSize:11, color:'#71717a', marginTop:4 }}>{s.label}</div>
          </div>
        ))}
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:10, marginBottom:28 }}>
        {TILES.map(c => (
          <button key={c.id} onClick={() => setActive(c.id)}
            style={{ background:'#18181b', border:'1px solid #27272a', borderRadius:10, padding:14, cursor:'pointer', textAlign:'left', transition:'border-color 0.15s, background 0.15s' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor='#f59e0b'; e.currentTarget.style.background='#1c1c1e'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor='#27272a'; e.currentTarget.style.background='#18181b'; }}
          >
            <div style={{ fontSize:20, marginBottom:8 }}>{c.emoji}</div>
            <div style={{ fontSize:13, fontWeight:700, color:'#e4e4e7', marginBottom:4 }}>{c.label}</div>
            <div style={{ fontSize:11, color:'#71717a', lineHeight:1.4 }}>{c.desc}</div>
          </button>
        ))}
      </div>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12 }}>
        <h2 style={{ margin:0, fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:2, color:'#52525b' }}>Featured Schemes</h2>
        <button onClick={() => setActive('schemes')} style={{ background:'none', border:'none', color:'#f59e0b', fontSize:12, cursor:'pointer' }}>View All →</button>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))', gap:12 }}>
        {SCHEMES.slice(0,6).map(s => <SchemeCard key={s.id} scheme={s} onApply={onApply} />)}
      </div>
    </div>
  );
}