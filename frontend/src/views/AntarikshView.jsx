import { ISRO_DATA, INVENTIONS } from '../data';

const STATUS_STYLE = { 'Operational':{bg:'#064e3b',color:'#10b981'}, 'Launched 2024':{bg:'#064e3b',color:'#10b981'}, '2025 Launch':{bg:'#451a03',color:'#f59e0b'}, '2026 Planned':{bg:'#1e3a5f',color:'#60a5fa'}, '2028 Planned':{bg:'#1e3a5f',color:'#60a5fa'} };

export default function AntarikshView() {
  return (
    <div style={{ padding:'20px 20px 40px' }}>
      <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:4 }}>
        <h2 style={{ margin:0, fontSize:20, fontWeight:800 }}>Antariksh</h2>
        <span style={{ fontSize:11, background:'#1e3a5f', color:'#60a5fa', padding:'2px 10px', borderRadius:20, fontWeight:700 }}>ISRO + DRDO + DST</span>
      </div>
      <p style={{ margin:'0 0 24px', color:'#71717a', fontSize:12 }}>India's space, research & deep-tech intelligence hub.</p>

      <div style={{ fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:2, color:'#52525b', marginBottom:12 }}>Mission Pipeline</div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(240px,1fr))', gap:10, marginBottom:28 }}>
        {ISRO_DATA.map(m => {
          const st = STATUS_STYLE[m.status] || { bg:'#1c1c1e', color:'#a1a1aa' };
          return (
            <div key={m.mission} style={{ background:'#18181b', border:'1px solid #27272a', borderLeft:'3px solid #3b82f6', borderRadius:8, padding:14 }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:8 }}>
                <span style={{ fontSize:22 }}>{m.icon}</span>
                <span style={{ fontSize:10, fontWeight:700, padding:'2px 8px', borderRadius:20, background:st.bg, color:st.color }}>{m.status}</span>
              </div>
              <div style={{ fontSize:14, fontWeight:800, color:'#e4e4e7', marginBottom:6 }}>{m.mission}</div>
              <div style={{ fontSize:12, color:'#71717a', lineHeight:1.45 }}>{m.detail}</div>
            </div>
          );
        })}
      </div>

      <div style={{ background:'linear-gradient(135deg,#1c1a2e 0%,#0f0f1a 100%)', border:'1px solid #3b3160', borderRadius:12, padding:20, marginBottom:28 }}>
        <div style={{ fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:2, color:'#818cf8', marginBottom:10 }}>🚀 Gaganyaan Deep Dive</div>
        <h3 style={{ margin:'0 0 10px', fontSize:16, fontWeight:800, color:'#e4e4e7' }}>India's Human Spaceflight Mission</h3>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(140px,1fr))', gap:8 }}>
          {[['Crew','3 Astronauts'],['Orbit','400 km LEO'],['Duration','3 Days'],['Vehicle','LVM3 Rocket'],['Module','Crew Module + ESM'],['Year','2025']].map(([k,v]) => (
            <div key={k} style={{ background:'rgba(255,255,255,0.05)', borderRadius:8, padding:'8px 10px' }}>
              <div style={{ fontSize:10, color:'#71717a', marginBottom:2 }}>{k}</div>
              <div style={{ fontSize:13, fontWeight:700, color:'#818cf8' }}>{v}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:2, color:'#52525b', marginBottom:12 }}>Recent Indian Tech Inventions</div>
      <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
        {INVENTIONS.map(inv => (
          <div key={inv.title} style={{ background:'#18181b', border:'1px solid #27272a', borderRadius:8, padding:14, display:'flex', gap:12 }}>
            <div style={{ width:42, height:42, background:'#1e3a5f', borderRadius:8, display:'flex', alignItems:'center', justifyContent:'center', fontSize:20, flexShrink:0 }}>{inv.icon}</div>
            <div>
              <div style={{ display:'flex', gap:8, alignItems:'center', marginBottom:3 }}>
                <span style={{ fontSize:13, fontWeight:700, color:'#e4e4e7' }}>{inv.title}</span>
                <span style={{ fontSize:10, color:'#52525b' }}>{inv.year}</span>
              </div>
              <div style={{ fontSize:11, color:'#3b82f6', fontWeight:600, marginBottom:4 }}>{inv.org}</div>
              <div style={{ fontSize:12, color:'#71717a', lineHeight:1.45 }}>{inv.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}