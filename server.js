const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

//CORS
app.use(cors());

// Load env variables
dotenv.config({ path: './config/config.env' });

const app = express();


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});