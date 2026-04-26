export default function ApplyModal({ scheme, onClose }) {
  if (!scheme) return null;
  return (
    <div onClick={onClose} style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.8)', zIndex:90, display:'flex', alignItems:'center', justifyContent:'center', padding:20 }}>
      <div onClick={e => e.stopPropagation()}
        style={{ background:'#18181b', border:'1px solid #3f3f46', borderRadius:14, width:'min(520px,100%)', maxHeight:'88vh', overflowY:'auto', padding:28, boxShadow:'0 32px 80px rgba(0,0,0,0.7)' }}
      >
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:20 }}>
          <div>
            <div style={{ fontSize:10, color:'#71717a', marginBottom:5, textTransform:'uppercase', letterSpacing:1.2, fontWeight:600 }}>{scheme.ministry}</div>
            <h3 style={{ margin:0, fontSize:18, fontWeight:800, color:'#f1f5f9', lineHeight:1.3 }}>{scheme.title}</h3>
          </div>
          <button onClick={onClose} style={{ background:'#27272a', border:'1px solid #3f3f46', borderRadius:6, color:'#71717a', width:30, height:30, cursor:'pointer', fontSize:16, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, marginLeft:12 }}>✕</button>
        </div>
        <div style={{ background:'#1c0f00', border:'1px solid #451a03', borderRadius:10, padding:'12px 16px', marginBottom:20, display:'inline-flex', alignItems:'center', gap:10 }}>
          <span style={{ fontSize:22 }}>💰</span>
          <div>
            <div style={{ fontSize:10, color:'#92400e', fontWeight:600, textTransform:'uppercase', letterSpacing:1 }}>Financial Benefit</div>
            <div style={{ fontSize:22, fontWeight:900, color:'#f59e0b', letterSpacing:-0.5 }}>{scheme.benefit}</div>
          </div>
        </div>
        <div style={{ background:'#1c1c1e', borderRadius:8, padding:'8px 12px', marginBottom:22, fontSize:13, color:'#a1a1aa' }}>
          <span style={{ color:'#71717a' }}>Eligibility: </span>{scheme.eligibility}
        </div>
        <div style={{ marginBottom:22 }}>
          <div style={{ fontSize:11, color:'#71717a', marginBottom:12, textTransform:'uppercase', letterSpacing:1.2, fontWeight:700 }}>Required Documents</div>
          {scheme.docs.map((doc, i) => (
            <div key={i} style={{ display:'flex', alignItems:'center', gap:10, padding:'9px 0', borderBottom: i < scheme.docs.length - 1 ? '1px solid #27272a' : 'none' }}>
              <div style={{ width:20, height:20, borderRadius:4, background:'#064e3b', border:'1px solid #065f46', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                <span style={{ color:'#10b981', fontSize:11, fontWeight:900 }}>✓</span>
              </div>
              <span style={{ fontSize:14, color:'#d4d4d8' }}>{doc}</span>
            </div>
          ))}
        </div>
        <a href={scheme.portal} target="_blank" rel="noopener noreferrer"
          style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:8, background:'#f59e0b', color:'#09090b', borderRadius:10, padding:'13px 20px', fontSize:14, fontWeight:800, textDecoration:'none', transition:'opacity 0.15s' }}
          onMouseEnter={e => e.currentTarget.style.opacity = '0.88'}
          onMouseLeave={e => e.currentTarget.style.opacity = '1'}
        >
          Apply on Official Portal <span style={{ fontSize:16 }}>→</span>
        </a>
        <div style={{ marginTop:14, padding:'10px 14px', background:'#0c0c0e', border:'1px solid #27272a', borderRadius:8, fontSize:11, color:'#52525b', lineHeight:1.5 }}>
          ⚠️ KITE does not process applications. The link above redirects to the official .gov.in portal.
        </div>
      </div>
    </div>
  );
}