const express = require('express');
const dotenv = require('dotenv');
const sequelize = require('./config/database');
const authRoutes = require('./routes/auth.route');
const lapanganRoutes = require ('./routes/lapangan.route');
const reviewRoutes = require ('./routes/review.route');

dotenv.config();

const app = express();

app.use(express.json());

app.use('/api/lapangans', lapanganRoutes);
app.use('/api/reviews', reviewRoutes);

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;

sequelize.sync()
    .then(() => {
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch(err => console.log('Error: ' + err));
