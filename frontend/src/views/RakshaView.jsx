import { DEFENSE_DATA, RECRUITMENT } from '../data';

const ST = { Active:{bg:'#064e3b',color:'#10b981'}, Testing:{bg:'#1e3a5f',color:'#60a5fa'}, Trials:{bg:'#1e3a5f',color:'#60a5fa'}, Development:{bg:'#451a03',color:'#f59e0b'} };
const RS = { Open:{bg:'#064e3b',color:'#10b981'}, 'Open Soon':{bg:'#451a03',color:'#f59e0b'}, Closed:{bg:'#1c1c1e',color:'#52525b'} };

export default function RakshaView() {
  return (
    <div style={{ padding:'20px 20px 40px' }}>
      <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:4 }}>
        <h2 style={{ margin:0, fontSize:20, fontWeight:800 }}>Raksha</h2>
        <span style={{ fontSize:11, background:'#451a03', color:'#fb923c', padding:'2px 10px', borderRadius:20, fontWeight:700 }}>DRDO · Indian Armed Forces</span>
      </div>
      <p style={{ margin:'0 0 24px', color:'#71717a', fontSize:12 }}>Defense machinery intelligence & recruitment notifications.</p>

      <div style={{ fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:2, color:'#52525b', marginBottom:12 }}>Hardware Spotlight</div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))', gap:12, marginBottom:28 }}>
        {DEFENSE_DATA.map(d => {
          const st = ST[d.status] || ST.Development;
          return (
            <div key={d.name} style={{ background:'#18181b', border:'1px solid #27272a', borderTop:`3px solid ${d.accent}`, borderRadius:10, padding:16, transition:'transform 0.15s' }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-1px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:4 }}>
                <div style={{ fontSize:15, fontWeight:800, color:'#e4e4e7' }}>{d.name}</div>
                <span style={{ fontSize:10, fontWeight:700, padding:'2px 8px', borderRadius:20, background:st.bg, color:st.color }}>{d.status}</span>
              </div>
              <div style={{ fontSize:11, color:'#71717a', marginBottom:12 }}>{d.type}</div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:6 }}>
                {Object.entries(d.specs).map(([k,v]) => (
                  <div key={k} style={{ background:'#1c1c1e', borderRadius:6, padding:'7px 9px' }}>
                    <div style={{ fontSize:9, color:'#52525b', marginBottom:2 }}>{k}</div>
                    <div style={{ fontSize:12, fontWeight:700, color:d.accent }}>{v}</div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:2, color:'#52525b', marginBottom:12 }}>Recruitment Calendar</div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))', gap:10, marginBottom:24 }}>
        {RECRUITMENT.map(r => {
          const st = RS[r.status] || RS.Closed;
          return (
            <div key={r.exam} style={{ background:'#18181b', border:'1px solid #27272a', borderRadius:8, padding:12 }}>
              <div style={{ fontSize:13, fontWeight:700, color:'#e4e4e7', marginBottom:4 }}>{r.exam}</div>
              <div style={{ fontSize:11, color:'#71717a', marginBottom:8 }}>📅 {r.date}</div>
              <span style={{ fontSize:10, fontWeight:700, padding:'3px 8px', borderRadius:20, background:st.bg, color:st.color }}>{r.status}</span>
            </div>
          );
        })}
      </div>

      <div style={{ fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:2, color:'#52525b', marginBottom:12 }}>DRDO Breakthroughs</div>
      <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
        {[
          { icon:'🛡️', title:'Kaveri Engine MkII',      desc:'Upgraded indigenous jet engine targeting 90 kN thrust — will power next-gen UAVs and trainer aircraft.' },
          { icon:'🔬', title:'DRDO Nano-Ceramic Vest',   desc:'Bulletproof vest using nano-ceramic composites — 40% lighter than current issue, stops AK-47 rounds.' },
          { icon:'🤖', title:'Daksha Bomb Disposal Bot', desc:'Bomb disposal robot with 3D camera, wireless jammer, and high-pressure water jet — inducted into NSG.' },
          { icon:'🌊', title:'AUV Sea Mine Detection',   desc:'Autonomous Underwater Vehicle for sea mine detection — tested successfully in the Arabian Sea 2024.' },
        ].map(b => (
          <div key={b.title} style={{ background:'#18181b', border:'1px solid #27272a', borderRadius:8, padding:14, display:'flex', gap:10 }}>
            <span style={{ fontSize:20, flexShrink:0 }}>{b.icon}</span>
            <div>
              <div style={{ fontSize:13, fontWeight:700, color:'#e4e4e7', marginBottom:3 }}>{b.title}</div>
              <div style={{ fontSize:12, color:'#71717a', lineHeight:1.45 }}>{b.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}