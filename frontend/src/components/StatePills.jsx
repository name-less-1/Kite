import { STATES } from '../data';

export default function StatePills({ selected, onSelect }) {
  return (
    <div style={{ padding:'0 20px', borderBottom:'1px solid #27272a', overflowX:'auto', flexShrink:0 }}>
      <div style={{ display:'flex', gap:6, padding:'10px 0', whiteSpace:'nowrap' }}>
        {STATES.map(s => {
          const active = selected === s;
          return (
            <button key={s} onClick={() => onSelect(s)}
              style={{ background: active ? '#f59e0b' : '#18181b', border: active ? 'none' : '1px solid #3f3f46', borderRadius:20, padding:'4px 14px', fontSize:12, fontWeight:600, color: active ? '#09090b' : '#71717a', cursor:'pointer', transition:'all 0.15s', flexShrink:0 }}
              onMouseEnter={e => { if (!active) e.currentTarget.style.color = '#e4e4e7'; }}
              onMouseLeave={e => { if (!active) e.currentTarget.style.color = '#71717a'; }}
            >
              {s}
            </button>
          );
        })}
      </div>
    </div>
  );
}