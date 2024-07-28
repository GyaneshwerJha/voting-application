const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const candidatesRoutes = require('./routes/candidateRoutes')
const voteRoutes = require('./routes/voteRoutes')
const electionRoutes = require('./routes/electionRoutes');
const userRoutes = require('./routes/userRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
const notificationRoutes = require('./routes/notificationRoutes')
const app = express();
// Connect to the database
connectDB();
require('dotenv').config();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(morgan('dev'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/candidates', candidatesRoutes)
app.use('/api/votes', voteRoutes);
app.use('/api/elections', electionRoutes);
app.use('/api/users', userRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/notifications', notificationRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.log(err.stack);
    console.log(err.message);
    res.status(500).json({ message: ' error' });
});

module.exports = app;