const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/schemes',     require('./routes/schemes'));
app.use('/api/laws',        require('./routes/laws'));
app.use('/api/complaints',  require('./routes/complaints'));
app.use('/api/jobs',        require('./routes/jobs'));
app.use('/api/alerts',      require('./routes/alerts'));

app.get('/', (req, res) => res.json({ message: 'KITE API v2 running' }));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: err.message });
});

const PORT = process.env.PORT || 5000;
console.log("LOCAL URI:", process.env.MONGO_URI);
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('MongoDB connection failed:', err.message);
    process.exit(1);
  });
