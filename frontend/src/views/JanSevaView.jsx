import { useState, useEffect } from 'react';
import { STATUS_COLOR } from '../data';

const API = 'https://kite-3cun.onrender.com';

const WASTE_BINS = [
  { color:'#16a34a', bg:'#14532d', border:'#166534', label:'Green Bin', title:'Wet / Organic', items:['Food scraps & leftovers','Vegetable & fruit peels','Leaves & garden waste','Eggshells','Tea & coffee grounds'] },
  { color:'#2563eb', bg:'#1e3a8a', border:'#1e40af', label:'Blue Bin',  title:'Dry / Recyclable', items:['Paper & cardboard','Plastic bottles & bags','Glass jars & bottles','Metal cans & tins','Newspapers & magazines'] },
  { color:'#dc2626', bg:'#7f1d1d', border:'#991b1b', label:'Red Bin',   title:'Hazardous Waste', items:['Batteries & cells','Paint & chemicals','Expired medicines','Syringes & sharps','CFL & LED bulbs'] },
];
const ISSUE_TYPES = ['Pothole','Illegal Dump','Missed Garbage','Broken Light','Waterlogging','Damaged Road','Other'];
const STEPS = ['Category','Details','Submit'];

function Tab({ label, active, onClick }) {
  return (
    <button onClick={onClick} style={{ background: active ? '#1c1c1e' : 'transparent', border:'1px solid', borderColor: active ? '#f59e0b' : '#3f3f46', borderRadius:8, padding:'6px 16px', fontSize:12, fontWeight:700, color: active ? '#f59e0b' : '#71717a', cursor:'pointer' }}>
      {label}
    </button>
  );
}

export default function JanSevaView({ user, token, onLoginRequest }) {
  const [tab, setTab]           = useState('waste');
  const [step, setStep]         = useState(1);
  const [issueType, setIT]      = useState('');
  const [desc, setDesc]         = useState('');
  const [location, setLocation] = useState('');
  const [gps, setGps]           = useState(false);
  const [filed, setFiled]       = useState(false);
  const [ticketId, setTicketId] = useState('');
  const [expanded, setExp]      = useState(null);
  const [complaints, setComplaints] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError]       = useState('');

  useEffect(() => {
    fetch(`${API}/api/complaints`)
      .then(r => r.json())
      .then(data => setComplaints(data))
      .catch(() => {});
  }, [filed]);

  const reset = () => { setStep(1); setIT(''); setDesc(''); setLocation(''); setGps(false); setFiled(false); setError(''); };

  const handleSubmit = async () => {
    if (!user) return onLoginRequest();
    setSubmitting(true);
    setError('');
    try {
      const res = await fetch(`${API}/api/complaints`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ category: issueType, location: location || 'Location not provided', description: desc }),
      });
      const data = await res.json();
      if (!res.ok) return setError(data.message || 'Submission failed');
      setTicketId(data.id);
      setFiled(true);
    } catch {
      setError('Something went wrong. Try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ padding:'20px 20px 40px' }}>
      <h2 style={{ margin:'0 0 4px', fontSize:20, fontWeight:800 }}>Jan-Seva · Civic Action</h2>
      <p style={{ margin:'0 0 16px', color:'#71717a', fontSize:12 }}>Manage waste, report civic issues, and track your grievances.</p>
      <div style={{ display:'flex', gap:6, marginBottom:20 }}>
        <Tab label="🗑️ Waste Guide"    active={tab==='waste'}   onClick={() => setTab('waste')} />
        <Tab label="📍 Report Issue"   active={tab==='report'}  onClick={() => setTab('report')} />
        <Tab label="🎫 Ticket Tracker" active={tab==='tracker'} onClick={() => setTab('tracker')} />
      </div>

      {tab === 'waste' && (
        <>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:12, marginBottom:20 }}>
            {WASTE_BINS.map(w => (
              <div key={w.label} style={{ background:w.bg, border:`1px solid ${w.border}`, borderRadius:10, padding:14 }}>
                <div style={{ fontSize:11, fontWeight:700, color:w.color, marginBottom:4, textTransform:'uppercase', letterSpacing:1 }}>{w.label}</div>
                <div style={{ fontSize:13, fontWeight:700, color:'#e4e4e7', marginBottom:10 }}>{w.title}</div>
                {w.items.map(it => <div key={it} style={{ fontSize:12, color:'#a1a1aa', padding:'2px 0', display:'flex', gap:6 }}><span style={{ color:w.color }}>·</span>{it}</div>)}
              </div>
            ))}
          </div>
          <div style={{ fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:2, color:'#52525b', marginBottom:10 }}>Waste-to-Wealth</div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
            {[
              { icon:'🌱', title:'Home Composting 101',  desc:'Turn kitchen scraps into rich compost in 45 days. Layer greens & browns alternately and aerate weekly.' },
              { icon:'♻️', title:'E-Waste Drop Points',   desc:'Drop old phones, cables & electronics at Attero / Karo Sambhav authorised collection hubs near you.' },
              { icon:'🏭', title:'Biogas from Waste',     desc:'MNRE subsidises home biogas units — convert 2 kg of food waste into cooking gas daily.' },
              { icon:'📦', title:'Paper Bag Initiative',  desc:'KVIC trains women to make paper bags from newspaper — earn ₹300–500/day from recycled paper.' },
            ].map(c => (
              <div key={c.title} style={{ background:'#18181b', border:'1px solid #27272a', borderRadius:10, padding:14, display:'flex', gap:10 }}>
                <span style={{ fontSize:22, flexShrink:0 }}>{c.icon}</span>
                <div>
                  <div style={{ fontSize:13, fontWeight:700, marginBottom:4 }}>{c.title}</div>
                  <div style={{ fontSize:12, color:'#71717a', lineHeight:1.4 }}>{c.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {tab === 'report' && (
        <div style={{ maxWidth:500 }}>
          {!filed ? (
            <>
              {/* Login prompt if not logged in */}
              {!user && (
                <div style={{ background:'#1c1400', border:'1px solid #f59e0b44', borderRadius:10, padding:14, marginBottom:20, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                  <span style={{ fontSize:13, color:'#d97706' }}>Sign in to file a complaint</span>
                  <button onClick={onLoginRequest} style={{ background:'#f59e0b', border:'none', borderRadius:6, padding:'6px 14px', fontWeight:700, fontSize:12, color:'#09090b', cursor:'pointer' }}>Login</button>
                </div>
              )}

              <div style={{ display:'flex', alignItems:'center', marginBottom:24 }}>
                {STEPS.map((s, i) => (
                  <div key={s} style={{ flex:1, display:'flex', alignItems:'center' }}>
                    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:4 }}>
                      <div style={{ width:28, height:28, borderRadius:'50%', background: step>i+1 ? '#f59e0b' : step===i+1 ? '#451a03' : '#1c1c1e', border: step===i+1 ? '2px solid #f59e0b' : '1px solid #3f3f46', display:'flex', alignItems:'center', justifyContent:'center', fontSize:12, fontWeight:700, color: step>i+1 ? '#09090b' : step===i+1 ? '#f59e0b' : '#52525b' }}>
                        {step > i+1 ? '✓' : i+1}
                      </div>
                      <span style={{ fontSize:10, color: step===i+1 ? '#f59e0b' : '#52525b' }}>{s}</span>
                    </div>
                    {i < STEPS.length-1 && <div style={{ flex:1, height:1, background: step>i+1 ? '#f59e0b' : '#27272a', margin:'0 4px', marginBottom:16 }} />}
                  </div>
                ))}
              </div>

              {step === 1 && (
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8 }}>
                  {ISSUE_TYPES.map(t => (
                    <button key={t} onClick={() => { setIT(t); setStep(2); }}
                      style={{ background: issueType===t ? '#1c0f00' : '#18181b', border:`1px solid ${issueType===t ? '#f59e0b' : '#27272a'}`, borderRadius:8, padding:12, cursor:'pointer', textAlign:'left' }}>
                      <div style={{ fontSize:13, fontWeight:700, color: issueType===t ? '#f59e0b' : '#e4e4e7' }}>{t}</div>
                    </button>
                  ))}
                </div>
              )}

              {step === 2 && (
                <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
                  <div style={{ background:'#1c1c1e', border:'1px solid #3f3f46', borderRadius:8, padding:'8px 12px', fontSize:13, color:'#f59e0b', fontWeight:700 }}>Issue: {issueType}</div>
                  <input value={location} onChange={e => setLocation(e.target.value)} placeholder="Location (e.g. MG Road, Sector 4, Jammu)"
                    style={{ background:'#18181b', border:'1px solid #3f3f46', borderRadius:8, padding:10, color:'#e4e4e7', fontSize:13, outline:'none' }} />
                  <textarea value={desc} onChange={e => setDesc(e.target.value)} placeholder="Describe the issue…" rows={3}
                    style={{ background:'#18181b', border:'1px solid #3f3f46', borderRadius:8, padding:10, color:'#e4e4e7', fontSize:13, resize:'vertical', outline:'none' }} />
                  <div onClick={() => setGps(g => !g)} style={{ background:'#18181b', border:'1px solid #27272a', borderRadius:8, padding:12, display:'flex', alignItems:'center', gap:10, cursor:'pointer' }}>
                    <div style={{ width:18, height:18, border:`2px solid ${gps ? '#f59e0b' : '#3f3f46'}`, borderRadius:4, background: gps ? '#f59e0b' : 'transparent', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                      {gps && <span style={{ color:'#09090b', fontSize:11, fontWeight:900 }}>✓</span>}
                    </div>
                    <span style={{ fontSize:13 }}>📍 Share GPS Location</span>
                  </div>
                  <div style={{ display:'flex', gap:8 }}>
                    <button onClick={() => setStep(1)} style={{ flex:1, background:'#18181b', border:'1px solid #3f3f46', borderRadius:8, padding:10, color:'#a1a1aa', fontSize:13, cursor:'pointer' }}>← Back</button>
                    <button onClick={() => setStep(3)} style={{ flex:2, background:'#f59e0b', border:'none', borderRadius:8, padding:10, fontWeight:700, fontSize:13, color:'#09090b', cursor:'pointer' }}>Review →</button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div>
                  <div style={{ background:'#18181b', border:'1px solid #27272a', borderRadius:8, padding:14, marginBottom:16 }}>
                    <div style={{ fontSize:11, color:'#71717a', marginBottom:10, textTransform:'uppercase', letterSpacing:1 }}>Review Before Submitting</div>
                    {[['Issue Type', issueType], ['Location', location || 'Not provided'], ['GPS Shared', gps ? 'Yes' : 'No'], ['Description', desc || 'Not provided'], ['Filed by', user ? user.name : 'Guest']].map(([k,v]) => (
                      <div key={k} style={{ display:'flex', justifyContent:'space-between', padding:'7px 0', borderBottom:'1px solid #27272a', fontSize:13, gap:10 }}>
                        <span style={{ color:'#71717a', flexShrink:0 }}>{k}</span>
                        <span style={{ fontWeight:600, textAlign:'right' }}>{v}</span>
                      </div>
                    ))}
                  </div>
                  {error && <div style={{ background:'#7f1d1d', border:'1px solid #991b1b', borderRadius:8, padding:'8px 12px', fontSize:12, color:'#fca5a5', marginBottom:12 }}>{error}</div>}
                  <div style={{ display:'flex', gap:8 }}>
                    <button onClick={() => setStep(2)} style={{ flex:1, background:'#18181b', border:'1px solid #3f3f46', borderRadius:8, padding:10, color:'#a1a1aa', fontSize:13, cursor:'pointer' }}>← Back</button>
                    <button onClick={handleSubmit} disabled={submitting}
                      style={{ flex:2, background:'#f59e0b', border:'none', borderRadius:8, padding:10, fontWeight:700, fontSize:13, color:'#09090b', cursor:'pointer', opacity: submitting ? 0.7 : 1 }}>
                      {submitting ? 'Submitting...' : 'Submit Report ✓'}
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div style={{ textAlign:'center', padding:'40px 20px' }}>
              <div style={{ fontSize:48, marginBottom:12 }}>✅</div>
              <div style={{ fontSize:18, fontWeight:800, color:'#10b981', marginBottom:8 }}>Report Filed Successfully!</div>
              <div style={{ fontSize:13, color:'#71717a', marginBottom:16 }}>Your ticket ID is</div>
              <div style={{ fontSize:24, fontWeight:900, color:'#f59e0b', fontFamily:'monospace', letterSpacing:2, marginBottom:8 }}>{ticketId}</div>
              <div style={{ fontSize:12, color:'#52525b', marginBottom:24 }}>Save this ID to track your complaint status</div>
              <div style={{ display:'flex', gap:8, justifyContent:'center' }}>
                <button onClick={() => setTab('tracker')} style={{ background:'#18181b', border:'1px solid #3f3f46', borderRadius:8, padding:'8px 16px', color:'#a1a1aa', fontSize:13, cursor:'pointer' }}>View Tracker →</button>
                <button onClick={reset} style={{ background:'none', border:'1px solid #3f3f46', borderRadius:8, padding:'8px 16px', color:'#71717a', fontSize:13, cursor:'pointer' }}>File Another</button>
              </div>
            </div>
          )}
        </div>
      )}

      {tab === 'tracker' && (
        <div style={{ maxWidth:560, display:'flex', flexDirection:'column', gap:10 }}>
          {complaints.map(c => {
            const stepIdx = ['Pending','Assigned','Resolved'].indexOf(c.status);
            const isOpen  = expanded === c.id;
            return (
              <div key={c.id} style={{ background:'#18181b', border:'1px solid #27272a', borderRadius:10, overflow:'hidden' }}>
                <div onClick={() => setExp(isOpen ? null : c.id)} style={{ padding:16, cursor:'pointer', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                  <div>
                    <div style={{ display:'flex', gap:8, alignItems:'center', marginBottom:4 }}>
                      <span style={{ fontSize:12, fontFamily:'monospace', color:'#71717a' }}>{c.id}</span>
                      <span style={{ fontSize:11, fontWeight:700, padding:'2px 8px', borderRadius:20, background: STATUS_COLOR[c.status]+'22', color: STATUS_COLOR[c.status] }}>{c.status}</span>
                    </div>
                    <div style={{ fontSize:14, fontWeight:700 }}>{c.category}</div>
                    <div style={{ fontSize:12, color:'#71717a', marginTop:2 }}>📍 {c.location} · {c.date}</div>
                    {c.user && <div style={{ fontSize:11, color:'#52525b', marginTop:2 }}>Filed by: {c.user.name || 'Citizen'}</div>}
                  </div>
                  <span style={{ fontSize:14, color:'#52525b', transition:'transform 0.2s', transform: isOpen ? 'rotate(180deg)' : 'none' }}>▾</span>
                </div>
                {isOpen && (
                  <div style={{ borderTop:'1px solid #27272a', padding:16, background:'#141414' }}>
                    <div style={{ display:'flex', alignItems:'center', marginBottom:14 }}>
                      {['Pending','Assigned','Resolved'].map((s, i) => (
                        <div key={s} style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center' }}>
                          <div style={{ display:'flex', width:'100%', alignItems:'center' }}>
                            {i > 0 && <div style={{ flex:1, height:2, background: i<=stepIdx ? STATUS_COLOR[c.status] : '#27272a' }} />}
                            <div style={{ width:20, height:20, borderRadius:'50%', background: i<=stepIdx ? STATUS_COLOR[c.status] : '#27272a', display:'flex', alignItems:'center', justifyContent:'center', fontSize:10, color:'#fff', flexShrink:0 }}>{i<=stepIdx ? '✓' : ''}</div>
                            {i < 2 && <div style={{ flex:1, height:2, background: i<stepIdx ? STATUS_COLOR[c.status] : '#27272a' }} />}
                          </div>
                          <span style={{ fontSize:9, color: i<=stepIdx ? STATUS_COLOR[c.status] : '#52525b', marginTop:4 }}>{s}</span>
                        </div>
                      ))}
                    </div>
                    {c.status === 'Resolved' && (
                      <div style={{ background:'#064e3b', border:'1px solid #065f46', borderRadius:8, padding:10, display:'flex', gap:8, alignItems:'center' }}>
                        <span style={{ fontSize:20 }}>📷</span>
                        <div>
                          <div style={{ fontSize:12, fontWeight:700, color:'#10b981' }}>Resolution Photo Available</div>
                          <div style={{ fontSize:11, color:'#6ee7b7' }}>Uploaded by Municipal Team</div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
