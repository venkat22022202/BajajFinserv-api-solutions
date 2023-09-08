const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const USER_ID = "Venkata Krishnan S";
const EMAIL = "vs9205@srmist.edu.in";
const ROLL_NUMBER = "RA2011003010165";

app.get('/bfhl', (req, res) => {
    res.status(200).json({ operation_code: 1 });
});

app.post('/bfhl', (req, res) => {
    try {
        const data = req.body.data;
        
        if (!Array.isArray(data)) {
            throw new Error('Data must be an array');
        }

        const numbers = data.filter(item => typeof item === 'string' && !isNaN(item));
        const alphabets = data.filter(item => typeof item === 'string' && isNaN(item) && item.length === 1);

        let highest_alphabet = null;
        if (alphabets.length > 0) {
            highest_alphabet = alphabets.sort((a, b) => b.localeCompare(a, 'en', { sensitivity: 'base' }))[0];
        }

        res.status(200).json({
            is_success: true,
            user_id: USER_ID,
            email: EMAIL,
            roll_number: ROLL_NUMBER,
            numbers: numbers,
            alphabets: alphabets,
            highest_alphabet: highest_alphabet ? [highest_alphabet] : []
        });
    } catch (error) {
        res.status(400).json({ is_success: false, error: error.message });
    }
});

const PORT =  3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

