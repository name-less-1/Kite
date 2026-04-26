import { ISRO_DATA, DEFENSE_DATA, RECRUITMENT } from '../data';

const ST = { Active:{bg:'#064e3b',color:'#10b981'}, Operational:{bg:'#064e3b',color:'#10b981'}, 'Launched 2024':{bg:'#064e3b',color:'#10b981'}, Testing:{bg:'#1e3a5f',color:'#60a5fa'}, Trials:{bg:'#1e3a5f',color:'#60a5fa'}, Development:{bg:'#451a03',color:'#f59e0b'} };
const RS = { Open:{bg:'#064e3b',color:'#10b981'}, 'Open Soon':{bg:'#451a03',color:'#f59e0b'}, Closed:{bg:'#1c1c1e',color:'#52525b'} };

function Label({ children }) {
  return <div style={{ fontSize:9, fontWeight:700, textTransform:'uppercase', letterSpacing:2, color:'#52525b', marginBottom:12 }}>{children}</div>;
}

export default function RightSidebar() {
  return (
    <aside style={{ width:258, flexShrink:0, borderLeft:'1px solid #27272a', background:'#09090b', overflowY:'auto', padding:'16px 14px', display:'flex', flexDirection:'column', gap:20 }}>

      <div>
        <Label>ISRO Pulse</Label>
        {ISRO_DATA.map(m => (
          <div key={m.mission} style={{ padding:'10px 0', borderBottom:'1px solid #1c1c1e', display:'flex', gap:10 }}>
            <span style={{ fontSize:18, flexShrink:0, marginTop:1 }}>{m.icon}</span>
            <div>
              <div style={{ fontSize:12, fontWeight:700, color:'#e4e4e7', marginBottom:2 }}>{m.mission}</div>
              <div style={{ fontSize:10, fontWeight:700, color: m.status === 'Operational' || m.status.includes('2024') ? '#10b981' : '#f59e0b', marginBottom:3 }}>{m.status}</div>
              <div style={{ fontSize:11, color:'#71717a', lineHeight:1.45 }}>{m.detail}</div>
            </div>
          </div>
        ))}
      </div>

      <div>
        <Label>Defense Spotlight</Label>
        {DEFENSE_DATA.slice(0,4).map(d => {
          const st = ST[d.status] || ST.Development;
          return (
            <div key={d.name} style={{ background:'#18181b', border:'1px solid #27272a', borderLeft:`3px solid ${d.accent}`, borderRadius:8, padding:'10px 12px', marginBottom:8 }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:4 }}>
                <div style={{ fontSize:12, fontWeight:800, color:'#e4e4e7', lineHeight:1.3 }}>{d.name}</div>
                <span style={{ fontSize:9, background:st.bg, color:st.color, padding:'2px 6px', borderRadius:20, fontWeight:700, flexShrink:0, marginLeft:6 }}>{d.status}</span>
              </div>
              <div style={{ fontSize:10, color:'#71717a', marginBottom:8 }}>{d.type}</div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:4 }}>
                {Object.entries(d.specs).map(([k,v]) => (
                  <div key={k} style={{ background:'#1c1c1e', borderRadius:5, padding:'5px 7px' }}>
                    <div style={{ fontSize:9, color:'#52525b', marginBottom:2 }}>{k}</div>
                    <div style={{ fontSize:11, fontWeight:700, color:d.accent }}>{v}</div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div>
        <Label>Recruitment Alerts</Label>
        <div style={{ background:'#1c0f00', border:'1px solid #451a03', borderRadius:8, padding:'10px 12px' }}>
          {RECRUITMENT.map((r, i) => {
            const st = RS[r.status] || RS.Closed;
            return (
              <div key={r.exam} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'7px 0', borderBottom: i < RECRUITMENT.length-1 ? '1px solid #27272a' : 'none', gap:6 }}>
                <div>
                  <div style={{ fontSize:12, fontWeight:700, color:'#e4e4e7' }}>{r.exam}</div>
                  <div style={{ fontSize:10, color:'#71717a' }}>{r.date}</div>
                </div>
                <span style={{ fontSize:9, fontWeight:700, padding:'3px 7px', borderRadius:20, background:st.bg, color:st.color, flexShrink:0 }}>{r.status}</span>
              </div>
            );
          })}
        </div>
      </div>

    </aside>
  );
}