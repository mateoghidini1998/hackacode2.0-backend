const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const sequelize = require('./config/db');
const cookieParser = require('cookie-parser');
const associations = require('./models/associations');

const app = express();
//CORS
app.use(cors());

//Body parser
app.use(express.json({ extended:false }));

//Cookie parser
app.use(cookieParser());

//Route files
const auth = require('./routes/auth');
const employees = require('./routes/employees');
const customers = require('./routes/customers');
const sales = require('./routes/sales');
const services = require('./routes/services');
const users = require('./routes/users');

//Define routes
app.use('/api/v1/auth', auth);
app.use('/api/v1/employees', employees);
app.use('/api/v1/customers', customers);
app.use('/api/v1/sales', sales);
app.use('/api/v1/services', services);
app.use('/api/v1/users', users);  

//Sequelize connection to DB
sequelize.authenticate()
 .then(() => {
   console.log('Connection to DB successfully stablished.');
 })
 .catch(err => {
   console.error('Erro while trying to connect to DB:', err);
 });


 sequelize.authenticate()
 .then(() => {
   console.log('Connection to DB successfully stablished.');
 })
 .catch(err => {
   console.error('Erro while trying to connect to DB:', err);
 });

app.get('/', (req, res) => res.send('API Running'));

// Load env variables
dotenv.config({ path: './config/config.env' });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});