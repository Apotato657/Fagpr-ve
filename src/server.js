const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'postgres',
    port: 5432,
});

function validateParams(params, res) {
    for (const [key, value] of Object.entries(params)) {
        if (!value) {
            res.status(400).json({ error: `${key} må sendes med` });
            return false;
        }
    }
    return true;
}

app.post('/api/filter', async (req, res) => {
    const { userId, filterId, filterName } = req.body;
    if (!validateParams({ userId, filterId, filterName }, res)) return;

    try {
        const result = await pool.query(
            'INSERT INTO filter (user_id, filter_id, filter_name) VALUES ($1, $2, $3) RETURNING *',
            [userId, filterId, filterName]
        );
        res.status(201).json({ message: 'Filter lagt til', filter: result.rows[0] });
    } catch (error) {
        console.error('Feil ved lagring av filter:', error);
        res.status(500).json({ error: 'Kunne ikke legge til filter' });
    }
});

app.listen(port, () => {
    console.log(`✅ Server kjører på http://localhost:${port}`);
});
