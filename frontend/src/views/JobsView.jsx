import { useState } from 'react';
import SchemeCard from '../components/SchemeCard';
import { SCHEMES, JOB_CATEGORIES } from '../data';

const JOB_MAP = { Farmer:'Farmers', Engineer:'Engineers', Artisan:'Artisans', Teacher:'Students', Vendor:'MSME', Doctor:'Students', Nurse:'Students', Artist:'Artisans' };
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
  const filtered = SCHEMES.filter(s => s.category === (JOB_MAP[activeJob] || 'MSME') || s.state === 'National').slice(0,6);
  return (
    <div style={{ padding:'20px 20px 40px' }}>
      <h2 style={{ margin:'0 0 4px', fontSize:20, fontWeight:800 }}>Job-Specific Hub</h2>
      <p style={{ margin:'0 0 16px', color:'#71717a', fontSize:12 }}>Select your profession to see tailored schemes and resources.</p>
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
      <div style={{ fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:2, color:'#52525b', marginBottom:12 }}>Schemes for {activeJob}s</div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))', gap:12, marginBottom:28 }}>
        {filtered.map(s => <SchemeCard key={s.id} scheme={s} onApply={onApply} />)}
      </div>
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