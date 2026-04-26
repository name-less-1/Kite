import { useEffect, useRef, useState } from 'react';
import { SCHEMES, LAWS } from '../data';

const QUICK = ['PM Kisan', 'Gaganyaan', 'BNS 2023', 'Mudra Loan', 'Scholarship', 'Pension'];

export default function SearchModal({ onClose, onSelectScheme, onSelectLaw }) {
  const [query, setQuery] = useState('');
  const ref = useRef(null);
  useEffect(() => { ref.current?.focus(); }, []);

  const q = query.toLowerCase().trim();
  const schemeHits = q.length > 1 ? SCHEMES.filter(s => s.title.toLowerCase().includes(q) || s.category.toLowerCase().includes(q) || s.tag.toLowerCase().includes(q) || s.ministry.toLowerCase().includes(q)) : [];
  const lawHits    = q.length > 1 ? LAWS.filter(l => l.title.toLowerCase().includes(q) || l.summary.toLowerCase().includes(q)) : [];
  const results    = [...schemeHits.map(s => ({ ...s, _type:'Scheme' })), ...lawHits.map(l => ({ ...l, _type:'Law' }))];

  return (
    <div onClick={onClose} style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.74)', zIndex:100, display:'flex', alignItems:'flex-start', justifyContent:'center', paddingTop:'14vh' }}>
      <div onClick={e => e.stopPropagation()} style={{ background:'#18181b', border:'1px solid #3f3f46', borderRadius:12, width:'min(600px,92vw)', overflow:'hidden', boxShadow:'0 32px 72px rgba(0,0,0,0.7)' }}>
        <div style={{ display:'flex', alignItems:'center', padding:'12px 16px', borderBottom:'1px solid #27272a', gap:10 }}>
          <span style={{ fontSize:18, opacity:0.4 }}>⌕</span>
          <input ref={ref} value={query} onChange={e => setQuery(e.target.value)} placeholder="Search schemes, laws, missions…"
            style={{ flex:1, background:'none', border:'none', outline:'none', color:'#e4e4e7', fontSize:15 }} />
          <kbd onClick={onClose} style={{ background:'#27272a', border:'1px solid #3f3f46', borderRadius:4, padding:'2px 7px', fontSize:11, color:'#71717a', cursor:'pointer' }}>ESC</kbd>
        </div>
        {results.length > 0 ? (
          <div style={{ maxHeight:380, overflowY:'auto' }}>
            {results.map((r, i) => (
              <div key={i} onClick={() => { r._type === 'Scheme' ? onSelectScheme(r) : onSelectLaw(); onClose(); }}
                style={{ padding:'12px 16px', borderBottom:'1px solid #1c1c1e', cursor:'pointer', display:'flex', alignItems:'center', gap:12, transition:'background 0.12s' }}
                onMouseEnter={e => e.currentTarget.style.background = '#1c1c1e'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <span style={{ background: r._type === 'Scheme' ? '#451a03' : '#1c1917', color: r._type === 'Scheme' ? '#f59e0b' : '#a8a29e', fontSize:10, padding:'2px 8px', borderRadius:20, fontWeight:700, flexShrink:0 }}>{r._type}</span>
                <div style={{ minWidth:0 }}>
                  <div style={{ fontSize:14, color:'#e4e4e7', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{r.title}</div>
                  {r._type === 'Scheme' && <div style={{ fontSize:11, color:'#71717a', marginTop:2 }}>{r.ministry} · {r.benefit}</div>}
                </div>
              </div>
            ))}
          </div>
        ) : query.length > 1 ? (
          <div style={{ padding:'28px 20px', textAlign:'center', color:'#52525b', fontSize:14 }}>No results for "{query}"</div>
        ) : (
          <div style={{ padding:16 }}>
            <div style={{ fontSize:11, color:'#52525b', marginBottom:8, textTransform:'uppercase', letterSpacing:1 }}>Quick Search</div>
            <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
              {QUICK.map(t => <button key={t} onClick={() => setQuery(t)} style={{ background:'#27272a', border:'1px solid #3f3f46', borderRadius:6, padding:'4px 10px', color:'#a1a1aa', fontSize:12, cursor:'pointer' }}>{t}</button>)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}