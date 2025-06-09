const express = require('express');
const app = express();

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');

dotenv.config();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use(cors({
  // origin:  '*', // Your deployed React frontend
  origin: ['https://workora.onrender.com'],
  credentials: true
}));

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));

app.use('/api', authRoutes); // mounted only once
// console.log('Worker routes:', workerRoutes);
app.use('/api', require('./routes/workerRoutes')); // mounted only once
app.use('/api', require('./routes/searchRoutes')); // mounted only once

// to hire worker
app.use('/api/workers', require('./routes/hireRoutes')); // mounted only once

// to delete hired worker
// you can use the same route as above
app.use('/api',require ('./routes/searchRoutes')); // mounted only once

// forgot and reset passwords

app.use('/api', require('./routes/forgotRoutes')); // mounted only once
app.use('/api', require('./routes/forgotRoutes')); // mounted only once

// to get all workers

app.use('/api', require('./routes/searchRoutes')); // mounted only once


// to categorize workers

app.use('/api/workers', require('./routes/categoryRoutes')); // mounted only once

// Delete Account of the user
app.use('/api/users', require('./routes/authRoutes')); // mounted only once

// upload profile 
const path = require('path');
//  this will work for update of profile image also 
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// query sending
app.use('/send-query', require('./routes/authRoutes')); // mounted only once

// delete myself 

app.use('/api/worker', require('./routes/myworker')); // mounted only once

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
