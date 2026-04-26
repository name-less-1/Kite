import { TAG_BG } from '../data';

export default function SchemeCard({ scheme, onApply }) {
  const tagBg = TAG_BG[scheme.tag] || '#1c1c1e';
  return (
    <div
      style={{ background:'#18181b', border:'1px solid #27272a', borderRadius:10, padding:16, display:'flex', flexDirection:'column', gap:10, transition:'border-color 0.15s, transform 0.15s' }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = '#3f3f46'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = '#27272a'; e.currentTarget.style.transform = 'translateY(0)'; }}
    >
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
        <div style={{ fontSize:10, color:'#71717a', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', maxWidth:'60%' }}>{scheme.ministry}</div>
        <span style={{ fontSize:10, fontWeight:700, padding:'2px 8px', borderRadius:20, background:tagBg, color:'#a1a1aa', flexShrink:0 }}>{scheme.tag}</span>
      </div>
      <div style={{ fontSize:14, fontWeight:700, color:'#e4e4e7', lineHeight:1.35 }}>{scheme.title}</div>
      <div style={{ fontSize:22, fontWeight:900, color:'#f59e0b', letterSpacing:-0.5, lineHeight:1 }}>{scheme.benefit}</div>
      <div style={{ fontSize:11, background:'#1c1c1e', border:'1px solid #27272a', borderRadius:6, padding:'5px 9px', color:'#a1a1aa', display:'flex', gap:5, alignItems:'center' }}>
        <span>👤</span><span>{scheme.eligibility}</span>
      </div>
      <div style={{ display:'flex', alignItems:'center', gap:8, fontSize:11 }}>
        <span style={{ background: scheme.state === 'National' ? '#1c1a2e' : '#1c2a1c', color: scheme.state === 'National' ? '#818cf8' : '#6ee7b7', padding:'2px 7px', borderRadius:20, fontWeight:600 }}>{scheme.state}</span>
        <span style={{ color:'#52525b' }}>· {scheme.category}</span>
      </div>
      <button onClick={() => onApply(scheme)}
        style={{ background:'#f59e0b', border:'none', borderRadius:8, padding:'10px 14px', fontSize:13, fontWeight:800, color:'#09090b', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:6, marginTop:'auto', transition:'opacity 0.15s' }}
        onMouseEnter={e => e.currentTarget.style.opacity = '0.88'}
        onMouseLeave={e => e.currentTarget.style.opacity = '1'}
      >
        Apply Now <span style={{ fontSize:15 }}>→</span>
      </button>
    </div>
  );
}