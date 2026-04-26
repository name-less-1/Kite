import { useState } from 'react';
import { LAWS } from '../data';

const STATUS_STYLE = { 'Enacted':{bg:'#064e3b',color:'#10b981'}, 'In Force':{bg:'#064e3b',color:'#10b981'}, 'Active':{bg:'#1e3a5f',color:'#60a5fa'} };

export default function LegislativeView() {
  const [expanded, setExpanded] = useState(null);
  return (
    <div style={{ padding:'20px 20px 40px' }}>
      <h2 style={{ margin:'0 0 4px', fontSize:20, fontWeight:800 }}>Legislative Tracker</h2>
      <p style={{ margin:'0 0 24px', color:'#71717a', fontSize:12 }}>New Indian laws explained in plain language — no legal jargon, no confusion.</p>
      <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
        {LAWS.map(law => {
          const st   = STATUS_STYLE[law.status] || { bg:'#451a03', color:'#f59e0b' };
          const open = expanded === law.id;
          return (
            <div key={law.id} style={{ background:'#18181b', border:'1px solid #27272a', borderRadius:10, overflow:'hidden' }}>
              <div onClick={() => setExpanded(open ? null : law.id)}
                style={{ padding:16, cursor:'pointer', display:'flex', justifyContent:'space-between', alignItems:'center', transition:'background 0.12s' }}
                onMouseEnter={e => e.currentTarget.style.background = '#1c1c1e'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ display:'flex', gap:8, alignItems:'center', marginBottom:6, flexWrap:'wrap' }}>
                    <span style={{ fontSize:11, fontWeight:700, padding:'2px 8px', borderRadius:20, background:st.bg, color:st.color }}>{law.status}</span>
                    <span style={{ fontSize:11, color:'#52525b' }}>{law.date}</span>
                  </div>
                  <div style={{ fontSize:14, fontWeight:700, color:'#e4e4e7', marginBottom:4, lineHeight:1.3 }}>{law.title}</div>
                  <div style={{ fontSize:12, color:'#71717a', lineHeight:1.4 }}>{law.summary}</div>
                </div>
                <span style={{ fontSize:16, color:'#52525b', marginLeft:16, transition:'transform 0.2s', transform: open ? 'rotate(180deg)' : 'none', flexShrink:0 }}>▾</span>
              </div>
              {open && (
                <div style={{ borderTop:'1px solid #27272a', padding:16, background:'#141414' }}>
                  <div style={{ fontSize:11, fontWeight:700, color:'#f59e0b', marginBottom:12, textTransform:'uppercase', letterSpacing:1.2 }}>⚡ What This Means For You</div>
                  <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                    {law.bullets.map((b, i) => (
                      <div key={i} style={{ display:'flex', gap:10, alignItems:'flex-start' }}>
                        <span style={{ color:'#f59e0b', fontSize:14, flexShrink:0, marginTop:1 }}>→</span>
                        <span style={{ fontSize:13, color:'#d4d4d8', lineHeight:1.5 }}>{b}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop:14, padding:'10px 14px', background:'#0c0c0e', border:'1px solid #27272a', borderRadius:8, fontSize:11, color:'#52525b' }}>
                    📖 Source: PRS Legislative Research India · Ministry of Law & Justice
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div style={{ marginTop:20, background:'#18181b', border:'1px dashed #3f3f46', borderRadius:10, padding:20, textAlign:'center' }}>
        <div style={{ fontSize:22, marginBottom:8 }}>⏳</div>
        <div style={{ fontSize:13, fontWeight:700, color:'#71717a' }}>Bills Under Parliament Review</div>
        <div style={{ fontSize:12, color:'#52525b', marginTop:4 }}>Uniform Civil Code, DPDP Rules, AI Governance Bill — coming soon</div>
      </div>
    </div>
  );
}