const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const sequelize = require('./config/db');

// Load env variables
dotenv.config({ path: './config/config.env' });

const app = express();

//CORS
app.use(cors());

//Sequelize connection to DB
sequelize.authenticate()
 .then(() => {
   console.log('Connection to DB successfully stablished.');
 })
 .catch(err => {
   console.error('Erro while trying to connect to DB:', err);
 });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});