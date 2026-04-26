const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const SCHEMES = [
  { id: 1, title: 'PM Scholarship Scheme', category: 'Students', benefit: '₹25,000 / Year', state: 'National', tag: 'Scholarship' },
  { id: 2, title: 'Mudra Loan for Women',  category: 'Women',    benefit: '₹10 Lakh Loan',  state: 'National', tag: 'Loan' },
  { id: 3, title: 'PM-KISAN Samman Nidhi', category: 'Farmers',  benefit: '₹6,000 / Year',  state: 'National', tag: 'Direct Benefit' },
  { id: 4, title: 'J&K Merit Scholarship', category: 'Students', benefit: '₹10,000 / Year', state: 'J&K',      tag: 'Scholarship' },
  { id: 5, title: 'Delhi Startup Grant',   category: 'MSME',     benefit: '₹5 Lakh Grant',  state: 'Delhi',    tag: 'Grant' },
];
app.get('/api/schemes', (req, res) => {
  const { state } = req.query;
  let result = SCHEMES;
  if (state && state !== 'National') {
    result = SCHEMES.filter(s => s.state === 'National' || s.state === state);
  }
  res.json(result);
});

app.get('/api/jobs', (req, res) => {
  res.json([
    { id: 1, title: 'Junior Engineer',    org: 'DRDO',       location: 'Delhi',   type: 'Government' },
    { id: 2, title: 'Agniveer (Army)',    org: 'Indian Army', location: 'PAN India', type: 'Defence' },
    { id: 3, title: 'Constable Recruit', org: 'Delhi Police', location: 'Delhi',  type: 'Police' },
  ]);
});

app.get('/api/laws', (req, res) => {
  res.json([
    { id: 1, title: 'Digital Personal Data Protection Act, 2023', status: 'Enacted',  date: 'Aug 2023' },
    { id: 2, title: 'Telecommunications Act, 2023',               status: 'Enacted',  date: 'Dec 2023' },
    { id: 3, title: 'Bharatiya Nyaya Sanhita (BNS), 2023',        status: 'In Force', date: 'Jul 2024' },
  ]);
});

app.get('/api/complaints', (req, res) => {
  res.json([
    { id: 'TKT-2341', category: 'Pothole',       location: 'MG Road, Jammu',       status: 'Resolved' },
    { id: 'TKT-2298', category: 'Illegal Dump',  location: 'Near Bus Stand, Jammu', status: 'Assigned' },
    { id: 'TKT-2187', category: 'Broken Light',  location: 'Gandhi Nagar Crossing', status: 'Pending'  },
  ]);
});

app.listen(5000, () => console.log('KITE API running on http://localhost:5000'));
