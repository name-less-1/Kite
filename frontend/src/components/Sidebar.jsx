import { NAV_ITEMS } from '../data';

export default function Sidebar({ active, setActive }) {
  return (
    <aside style={{ width:64, flexShrink:0, background:'#0c0c0e', borderRight:'1px solid #27272a', display:'flex', flexDirection:'column', alignItems:'center', paddingTop:14, gap:2, zIndex:10, overflowY:'auto' }}>
      <div style={{ width:36, height:36, background:'#f59e0b', borderRadius:8, display:'flex', alignItems:'center', justifyContent:'center', fontWeight:900, fontSize:13, color:'#09090b', marginBottom:18, userSelect:'none' }}>
        KI
      </div>
      {NAV_ITEMS.map(n => {
        const on = active === n.id;
        return (
          <button key={n.id} title={n.label} onClick={() => setActive(n.id)}
            style={{ width:48, height:52, background: on ? '#1c1c1e' : 'transparent', border: on ? '1px solid #3f3f46' : '1px solid transparent', borderRadius:8, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', gap:3, color: on ? '#f59e0b' : '#52525b', transition:'all 0.15s', flexShrink:0 }}
            onMouseEnter={e => { if (!on) e.currentTarget.style.color = '#a1a1aa'; }}
            onMouseLeave={e => { if (!on) e.currentTarget.style.color = '#52525b'; }}
          >
            <span style={{ fontSize:17, lineHeight:1 }}>{n.emoji}</span>
            <span style={{ fontSize:8.5, letterSpacing:0.5, fontWeight:700, textTransform:'uppercase', color:'inherit' }}>{n.short}</span>
          </button>
        );
      })}
      <div style={{ flex:1 }} />
      <div style={{ width:28, height:28, borderRadius:'50%', background:'#451a03', border:'2px solid #f59e0b', display:'flex', alignItems:'center', justifyContent:'center', fontSize:10, fontWeight:900, color:'#f59e0b', marginBottom:14, userSelect:'none' }}>
        IK
      </div>
    </aside>
  );
}