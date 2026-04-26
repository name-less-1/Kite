// In any React component — example: SchemesView.jsx

import { useEffect, useState } from 'react';

export default function SchemesView() {
  const [schemes, setSchemes] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/schemes')
      .then(res => res.json())
      .then(data => setSchemes(data))
      .catch(err => console.error('Failed to fetch schemes:', err));
  }, []);

  return (
    <div>
      {schemes.map(s => (
        <div key={s.id}>
          <h3>{s.title}</h3>
          <p>{s.benefit}</p>
        </div>
      ))}
    </div>
  );
}
