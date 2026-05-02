import { useEffect, useState } from 'react';

const API = 'https://kite-3cun.onrender.com';

export default function CityAlert() {
  const [alerts, setAlerts] = useState([]);
  const [idx, setIdx]       = useState(0);

  useEffect(() => {
    fetch(`${API}/api/alerts`)
      .then(r => r.json())
      .then(data => setAlerts(data))
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (alerts.length === 0) return;
    const t = setInterval(() => setIdx(i => (i + 1) % alerts.length), 4200);
    return () => clearInterval(t);
  }, [alerts]);

  if (alerts.length === 0) return null;

  const alert = alerts[idx];

  return (
    <div style={{ margin:'14px 20px 0', background:'#1c1c1e', border:'1px solid #3f3f46', borderLeft:'3px solid #f59e0b', borderRadius:8, padding:'10px 14px', display:'flex', alignItems:'center', gap:12 }}>
      <span style={{ fontSize:20, flexShrink:0 }}>{alert.icon}</span>
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ fontSize:10, color:'#f59e0b', fontWeight:700, textTransform:'uppercase', letterSpacing:1.2, marginBottom:3 }}>
          {alert.city} · {alert.type}
        </div>
        <div style={{ fontSize:13, color:'#d4d4d8', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
          {alert.msg}
        </div>
      </div>
      <div style={{ display:'flex', gap:4, flexShrink:0 }}>
        {alerts.map((_, i) => (
          <button key={i} onClick={() => setIdx(i)}
            style={{ width: i === idx ? 14 : 6, height:6, borderRadius:3, background: i === idx ? '#f59e0b' : '#3f3f46', border:'none', cursor:'pointer', padding:0, transition:'all 0.3s' }}
          />
        ))}
      </div>
    </div>
  );
}
