import { useState, useEffect } from 'react';
import { JOB_CATEGORIES } from '../data';

const API = 'https://kite-3cun.onrender.com';

const PORTALS = [
  { name:'NCS Portal',         url:'https://www.ncs.gov.in',            desc:'National Career Service — job listings across India' },
  { name:'ASEEM Portal',       url:'https://aseem.betterplace.co.in',   desc:'Skilled worker database connecting industry & talent' },
  { name:'PM E-VIDYA',         url:'https://pmvidya.in',                desc:'Free online courses for upskilling & reskilling' },
  { name:'iGOT Karmayogi',     url:'https://igotkarmayogi.gov.in',      desc:'Govt employee learning & capacity building platform' },
  { name:'Skill India Portal', url:'https://www.skillindia.gov.in',     desc:'Vocational training & certification programmes' },
  { name:'Udyam Registration', url:'https://udyamregistration.gov.in',  desc:'MSME & startup registration — mandatory for loans' },
];

export default function JobsView({ onApply }) {
  const [activeJob, setActiveJob] = useState('Engineer');
  const [jobs, setJobs]           = useState([]);

  useEffect(() => {
    fetch(`${API}/api/jobs?category=${activeJob}`)
      .then(r => r.json())
      .then(data => setJobs(data))
      .catch(() => {});
  }, [activeJob]);

  return (
    <div style={{ padding:'20px 20px 40px' }}>
      <h2 style={{ margin:'0 0 4px', fontSize:20, fontWeight:800 }}>Job-Specific Hub</h2>
      <p style={{ margin:'0 0 16px', color:'#71717a', fontSize:12 }}>Select your profession to see tailored government job openings.</p>
      <div style={{ display:'flex', gap:6, flexWrap:'wrap', marginBottom:20 }}>
        {JOB_CATEGORIES.map(j => {
          const active = activeJob === j;
          return (
            <button key={j} onClick={() => setActiveJob(j)}
              style={{ background: active ? '#f59e0b' : '#18181b', border: active ? 'none' : '1px solid #3f3f46', borderRadius:20, padding:'5px 16px', fontSize:12, fontWeight:600, color: active ? '#09090b' : '#71717a', cursor:'pointer', transition:'all 0.15s' }}>
              {j}
            </button>
          );
        })}
      </div>

      <div style={{ fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:2, color:'#52525b', marginBottom:12 }}>
        Open Positions for {activeJob}s
      </div>

      {jobs.length > 0 ? (
        <div style={{ display:'flex', flexDirection:'column', gap:10, marginBottom:28 }}>
          {jobs.map(j => (
            <a key={j._id} href={j.link} target="_blank" rel="noopener noreferrer"
              style={{ background:'#18181b', border:'1px solid #27272a', borderRadius:10, padding:16, textDecoration:'none', display:'flex', justifyContent:'space-between', alignItems:'center', transition:'border-color 0.15s' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = '#f59e0b'}
              onMouseLeave={e => e.currentTarget.style.borderColor = '#27272a'}
            >
              <div>
                <div style={{ fontSize:14, fontWeight:700, color:'#e4e4e7', marginBottom:4 }}>{j.title}</div>
                <div style={{ fontSize:12, color:'#71717a' }}>{j.org} · {j.location}</div>
                {j.deadline && <div style={{ fontSize:11, color:'#52525b', marginTop:4 }}>Deadline: {j.deadline}</div>}
              </div>
              <div style={{ display:'flex', flexDirection:'column', alignItems:'flex-end', gap:6, flexShrink:0 }}>
                <span style={{ fontSize:11, fontWeight:700, padding:'2px 8px', borderRadius:20, background:'#1e3a5f', color:'#60a5fa' }}>{j.type}</span>
                <span style={{ fontSize:11, color:'#f59e0b' }}>Apply ↗</span>
              </div>
            </a>
          ))}
        </div>
      ) : (
        <div style={{ textAlign:'center', padding:'40px 20px', color:'#52525b', fontSize:13, marginBottom:28 }}>
          No openings found for {activeJob}s right now.
        </div>
      )}

      <div style={{ fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:2, color:'#52525b', marginBottom:12 }}>National Job Portals</div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))', gap:10 }}>
        {PORTALS.map(p => (
          <a key={p.name} href={p.url} target="_blank" rel="noopener noreferrer"
            style={{ background:'#18181b', border:'1px solid #27272a', borderRadius:10, padding:14, textDecoration:'none', display:'block', transition:'border-color 0.15s' }}
            onMouseEnter={e => e.currentTarget.style.borderColor = '#f59e0b'}
            onMouseLeave={e => e.currentTarget.style.borderColor = '#27272a'}
          >
            <div style={{ fontSize:13, fontWeight:700, color:'#f59e0b', marginBottom:4 }}>{p.name} ↗</div>
            <div style={{ fontSize:11, color:'#71717a', lineHeight:1.4 }}>{p.desc}</div>
          </a>
        ))}
      </div>
    </div>
  );
}
