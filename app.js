const express = require('express');
const passport = require('passport');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const letterRoutes = require('./routes/letterRoutes');
const PORT = process.env.PORT || 5000;

require('dotenv').config();
require('./config/passport');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(cors()); 
app.use(passport.initialize());

// Routes
app.get('/', (req, res) => {
    res.send('Server is running!');
  });
app.use('/api', authRoutes);
app.use('/api', letterRoutes);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});