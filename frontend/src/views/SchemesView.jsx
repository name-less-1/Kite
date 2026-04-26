import { useState, useEffect } from 'react';
import SchemeCard from '../components/SchemeCard';
import { CATEGORY_FILTERS } from '../data';

export default function SchemesView({ onApply, stateFilter }) {
	const [schemes, setSchemes] = useState([]);
	const [cat, setCat] = useState('All');
	useEffect(() => {
		fetch(`/api/schemes?state=${stateFilter}`)
			.then(res => res.json())
			.then(data => setSchemes(data));
	}, [stateFilter]);


	const filtered = cat === 'All' ? schemes : schemes.filter(s => s.category === cat);
	return (
		<div style={{ padding: '20px 20px 40px' }}>
			<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
				<div>
					<h2 style={{ margin: '0 0 4px', fontSize: 20, fontWeight: 800 }}>Scheme Explorer</h2>
					<p style={{ margin: 0, color: '#71717a', fontSize: 12 }}>Government benefits for every Indian — filter by category.</p>
				</div>
				<span style={{ fontSize: 12, color: '#52525b', background: '#18181b', border: '1px solid #27272a', borderRadius: 20, padding: '3px 10px' }}>{filtered.length} schemes</span>
			</div>
			<div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 20 }}>
				{CATEGORY_FILTERS.map(c => {
					const active = cat === c;
					return (
						<button key={c} onClick={() => setCat(c)}
							style={{ background: active ? '#f59e0b' : '#18181b', border: active ? 'none' : '1px solid #3f3f46', borderRadius: 20, padding: '5px 14px', fontSize: 12, fontWeight: 600, color: active ? '#09090b' : '#71717a', cursor: 'pointer', transition: 'all 0.15s' }}>
							{c}
						</button>
					);
				})}
			</div>
			{filtered.length > 0 ? (
				<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: 12 }}>
					{filtered.map(s => <SchemeCard key={s.id} scheme={s} onApply={onApply} />)}
				</div>
			) : (
				<div style={{ textAlign: 'center', padding: '60px 20px', color: '#52525b', fontSize: 14 }}>
					No schemes match the current filters.
					<br />
					<button onClick={() => setCat('All')} style={{ marginTop: 12, background: 'none', border: '1px solid #3f3f46', borderRadius: 6, padding: '6px 14px', color: '#a1a1aa', fontSize: 12, cursor: 'pointer' }}>Clear Filters</button>
				</div>
			)}
		</div>
	);
}